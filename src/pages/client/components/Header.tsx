import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Button, Drawer, Form, Modal, Upload, UploadProps, message } from 'antd';
import './scss/header.scss'
import { StoreType, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { apis } from '@/service/apis';
import modal from 'antd/es/modal';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { User, userAction } from '@/store/slices/loginDetail.slice';
import enUS from 'antd/es/locale/en_US'


import jpImg from '../../../assets/japan-flag-icon-32.png'
import vnImg from '../../../assets/vietnam-flag-icon-32.png'
import usaImg from '../../../assets/united-states-of-america-flag-icon-32.png'





export default function Header() {



    const [userDetail, setUserDetail] = useState<User | null>()
    const userStore = useSelector((store: StoreType) => store.userStore)
    const dispatch = useDispatch()
    useEffect(() => {
        setUserDetail(userStore.data)
    }, [userStore.data])

    //ANTD warning notification
    const { confirm } = Modal;
    const showConfirm = (title: string) => {
        confirm({
            title,
            onOk() {
                localStorage.removeItem('token')
                dispatch(userAction.removeStore(null))

            },
            onCancel() {

            },
        });
    };



    const navigate = useNavigate()
    const [languageTrigger, setLanguageTrigger] = useState(false)
    const [accTrigger, setAccTrigger] = useState(false)
    let langMenuRef = useRef<HTMLInputElement>(null);
    let accMenuRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const handleMenuTrigger = (e: any) => {
            if (!langMenuRef.current?.contains(e.target)) {
                setLanguageTrigger(false);
            }

            if (!accMenuRef.current?.contains(e.target)) {
                setAccTrigger(false)
            }
        };
        document.addEventListener("mousedown", handleMenuTrigger)
    })


    const [open, setOpen] = useState(false);

    const [cart, setCart] = useState([])
    const getCartFn = async () => {
        try {
            if (localStorage.getItem('token')) {
                const user = await apis.userApiModule.checkLogin(localStorage.getItem('token') || 'null')
                if (user) {
                    const result = await apis.productCliApi.getCart(user.data.data.id)
                    if (result.status == 200) {
                        setCart(result.data.data)
                    } else {
                        message.error("Lấy dữ liệu thất bại")
                    }
                }
            }
        } catch (error) {

        }
    }
    const showDrawer = async () => {
        getCartFn()
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleAdjust = async (itemId: number, type: string) => {
        switch (type) {
            case '-':
                try {
                    const result = await apis.productCliApi.cartDecrease(itemId)
                    if (result.status == 200) {
                        message.success(result.data.message)
                    } else {
                        message.error("Giảm sản phẩm thất bại")
                    }
                } catch (error) {
                    message.error('Server đang bận xin thử lại sau')
                };
                getCartFn();
                break;
            case '+':
                try {
                    const result = await apis.productCliApi.cartIncrease(itemId)
                    if (result.status == 200) {
                        message.success(result.data.message)
                    } else {
                        message.error("Tăng thêm sản phẩm thất bại")
                    }
                } catch (error) {
                    message.error('Server đang bận xin thử lại sau')
                };
                getCartFn();
                break;
            default:
                break;
        }
    }

    const removeCartItem = (itemId: number) => {
        modal.confirm({
            title: 'Xác nhận',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn chắc chắn muốn xoá sản phẩm này trong giỏ hàng của bạn chứ?',
            okText: 'Xác nhận',
            cancelText: 'Huỷ',
            onOk: async () => {
                try {
                    const result = await apis.productCliApi.removeCartItem(itemId)
                    if (result.status == 200) {
                        message.success(result.data.message)
                    } else {
                        message.error('Xoá sản phẩm thất bại')
                    }
                } catch (error) {
                    message.error('Server đang bận xin thử lại sau')
                }
                getCartFn();
            }
        })
    }
    // Proform 
    const [newAvatar, setNewAvatar] = useState<any>()

    const handleEditAddAvt: UploadProps['onChange'] = (info) => {
        setNewAvatar(info.fileList[0].originFileObj)
    };

    const handleEditRmvAvt: UploadProps['onRemove'] = () => {
        setNewAvatar(null);
    };

    const [formRef] = Form.useForm<{
        address: string,
        paymentMethod: string,
        phone: string
    }>();
    const waitTime = (time: number = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };

    const [editPassForm] = Form.useForm<{
        newPassword: string,
        oldPassword: string
    }>();

    const [editPhoneForm] = Form.useForm<{
        newPhone: string,
        oldPhone: string
    }>();

    return (
        <header>


            <div className='header_top'>
                <section className='header_top_left'>
                    <img className='logo'
                        onClick={() => { navigate("/") }}
                        src="https://cdn-icons-png.flaticon.com/512/438/438560.png"
                        alt=""
                    />
                </section>

                <section className='header_top_middle'>
                    <div className='nav' onClick={() => { navigate("/") }}>
                        <span>Trang chủ</span>
                        <div className='navLine'></div>
                    </div>

                    <div className='nav' onClick={() => { navigate("/products") }}>
                        <span>Sản phẩm</span>
                        <div className='navLine'></div>
                    </div>

                    <div className='nav' onClick={() => { navigate("/offer") }}>
                        <span>Ưu đãi</span>
                        <div className='navLine'></div>
                    </div>

                    <div className='nav' onClick={() => { navigate("/blog") }}>
                        <span>Blog</span>
                        <div className='navLine'></div>
                    </div>

                    <div className='nav' onClick={() => { navigate("/contact") }}>
                        <span>Liên hệ</span>
                        <div className='navLine'></div>
                    </div>

                </section>

                <section className='header_top_right'>
                    <div ref={langMenuRef} className='languageBtn' >
                        <span>
                            <i className="fa-solid fa-earth-americas fa-lg" style={{ cursor: 'pointer' }} onClick={() => {
                                setLanguageTrigger(!languageTrigger)
                            }}></i>
                        </span>



                        <div className={languageTrigger ? 'langMenu_dropDown active' : 'langMenu_dropDown'}>
                            <p className=''>
                                <img src={vnImg} alt="" />
                                Tiếng Việt 
                            </p>


                            <p>
                            <img src={usaImg} alt="" />
                                Tiếng Anh
                            </p>

                            <p>
                                <img src={jpImg} alt="" />
                                Tiếng Nhật
                            </p>

                        </div>

                        {/* <span>
                            <i className="fa-regular fa-heart fa-lg"></i>
                        </span> */}


                    </div>


                    <div ref={accMenuRef} className='accountMenu'>

                        <div className='accountMenu_btn' onClick={() => { setAccTrigger(!accTrigger) }}>
                            <span className="material-symbols-outlined menuIcon">
                                menu
                            </span>

                            <span>{userDetail?.email?.split('@')[0]}</span>


                            <img src={userDetail?.avatar || "https://tse1.mm.bing.net/th?id=OIP.R5mlhTBdGitUND1A324dAQHaHa&pid=Api&rs=1&c=1&qlt=95&w=105&h=105"} className='userAvatar' alt="" />
                        </div>

                        <div className={accTrigger ? 'accountMenu_dropDown active' : 'accountMenu_dropDown'}>

                            {!userDetail?.id && <span onClick={() => { navigate("/auth") }}>Đăng nhập</span>}
                            {userDetail?.id && <span onClick={showDrawer}>Giỏ hàng</span>}


                            <Drawer title="Giỏ hàng" onClose={onClose} open={open} width={600}>
                                {cart.length == 0 ? <img className='cartEmpty' src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png' /> : cart.map(item => (
                                    <div key={Math.random() * Date.now()} className="cartItem">
                                        <img className='cartItemPic' src={(item as any).FK_products_cartItem.avatar} alt="" />
                                        <div className='info'>
                                            {/* <p>Tên sản phẩm:{(item as any).FK_products_cartItem.productName}</p> */}
                                            <p>{(item as any).FK_products_cartItem.productName}</p>
                                            {/* 
                                            <p>Giá:{(item as any).FK_products_cartItem.price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}</p> */}

                                            <p>{(item as any).FK_products_cartItem.price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}</p>


                                            <p>
                                                <span className='adjustBtn' onClick={() => {
                                                    if ((item as any).quantity <= 1) {
                                                        removeCartItem((item as any).id)
                                                    } else {
                                                        handleAdjust((item as any).id, '-')
                                                    }
                                                }}>-</span>{(item as any).quantity}<span className='adjustBtn' onClick={() => { handleAdjust((item as any).id, '+') }}>+</span>
                                            </p>

                                        </div>

                                        <Button type="primary" danger className='removeBtn' onClick={() => { removeCartItem((item as any).id) }}>
                                            Xóa
                                        </Button>
                                    </div>
                                ))
                                }
                                {cart.length == 0 ? <></> :
                                    <div className='cartFooter'>
                                        {/* <label htmlFor="">Số lượng : {cart.reduce((total, value) => { return total + (value as any).quantity }, 0)}</label> */}
                                        <label htmlFor="">Tổng tiền : {cart.reduce((total, value) => { return total + ((value as any).quantity * (value as any).FK_products_cartItem.price) }, 0).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}</label>
                                    </div>}
                                {cart.length == 0 ? <></> :
                                    <div className='paymentBtn'>
                                        <ModalForm<{
                                            address: string,
                                            paymentMethod: string,
                                            phone: string,
                                        } >
                                            title="Xác nhận thanh toán"
                                            trigger={
                                                <Button type="primary">
                                                    Thanh toán
                                                </Button>
                                            }
                                            form={formRef}
                                            autoFocusFirstInput
                                            variant="filled"
                                            modalProps={{
                                                destroyOnClose: true,
                                                onCancel: () => console.log('run'),
                                            }}
                                            submitTimeout={2000}

                                            onFinish={async (values) => {
                                                await waitTime(2000);
                                                switch (values.paymentMethod) {
                                                    case 'cod':
                                                        try {
                                                            const result = await apis.productCliApi.checkOutCOD({
                                                                id: (userDetail as any).id,
                                                                email: (userDetail as any).email,
                                                                phone: values.phone,
                                                                address: values.address
                                                            })
                                                            if (result.status == 200) {
                                                                message.success(result.data.message)
                                                                getCartFn();
                                                                return true
                                                            } else {
                                                                message.error("Thanh toán thất bại")
                                                            }
                                                        } catch (error) {
                                                            message.error("Thanh toán thất bại")
                                                        }
                                                        break;
                                                    case 'wallet':
                                                        try {
                                                            const result = await apis.productCliApi.checkOutWallet({
                                                                id: (userDetail as any).id,
                                                                email: (userDetail as any).email,
                                                                phone: values.phone,
                                                                address: values.address
                                                            })
                                                            if (result.status == 200) {
                                                                message.success(result.data.message)
                                                                store.dispatch(userAction.fetchUser())
                                                                getCartFn();
                                                                return true
                                                            } else {
                                                                message.warning(result.data.message)
                                                            }
                                                        } catch (error) {
                                                            message.error("Thanh toán thất bại")
                                                        }
                                                        break;
                                                    default:
                                                        break;
                                                }

                                            }}

                                        >
                                            <ProForm.Group >
                                                <ProFormText
                                                    width="md"
                                                    name="address"
                                                    label="Địa chỉ"
                                                    placeholder="Địa chỉ"
                                                    required
                                                />
                                                <ProFormText
                                                    width="md"
                                                    name="phone"
                                                    label="Số điện thoại"
                                                    placeholder="Số điện thoại"
                                                    required
                                                />

                                                <ProFormSelect
                                                    initialValue="cod" // Đặt giá trị mặc định cho lựa chọn là "cod" (Thanh toán khi nhận hàng)
                                                    width="md"
                                                    options={[
                                                        { value: 'cod', label: "Thanh toán khi nhận hàng" }
                                                    ]}
                                                    required
                                                    name="paymentMethod"
                                                    label="Cách thức thanh toán"


                                                />


                                            </ProForm.Group>
                                        </ModalForm>
                                    </div>
                                }
                            </Drawer>

                            <span>Biên lai</span>


                            {userDetail?.id && <ModalForm  <{}>
                                title="Thêm mới"
                                trigger={
                                    <span>Đổi avatar</span>
                                }
                                variant="filled"
                                modalProps={{
                                    destroyOnClose: true,
                                }}
                                submitTimeout={2000}
                                onFinish={async () => {
                                    await waitTime(2000);
                                    try {
                                        let formData = new FormData
                                        formData.append("id", JSON.stringify(userDetail?.id))
                                        formData.append("avatar", newAvatar as any)
                                        const result = await apis.userApiModule.uploadAvatar(formData)
                                        if (result.status == 200) {
                                            message.success(result.data.message)
                                            localStorage.setItem('token', result.data.token)
                                            dispatch(userAction.createStore(result.data.data))
                                            return true
                                        } else {
                                            message.error(result.data.message)
                                        }
                                    } catch (error) {
                                        console.log("error1", error);

                                        message.error('Chỉnh sửa thất bại')
                                    }

                                }}
                            >
                                <ProForm.Group style={{ margin: "10px 0px" }}  >
                                    <label style={{ width: '200px', display: "inline-block" }} htmlFor="">Ảnh đại diện</label>
                                    <Upload
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        listType="picture"
                                        defaultFileList={[]}
                                        beforeUpload={() => false}
                                        onChange={handleEditAddAvt}
                                        onRemove={handleEditRmvAvt}
                                        maxCount={1}


                                    >
                                        <Button  >Upload</Button>
                                    </Upload>
                                </ProForm.Group>

                            </ModalForm>}


                            <ModalForm<{
                                newPassword: string,
                                oldPassword: string
                            }>
                                title="Thêm mới"
                                trigger={
                                    <span>Đổi mật khẩu</span>
                                }
                                form={editPassForm}
                                autoFocusFirstInput
                                variant="filled"
                                modalProps={{
                                    destroyOnClose: true,
                                }}
                                submitTimeout={2000}
                                onFinish={async (values) => {
                                    await waitTime(2000);
                                    try {
                                        if (userDetail != null) {
                                            const result = await apis.userApiModule.updatePassword({ userId: userDetail.id, old: values.oldPassword, new: values.newPassword })
                                            if (result.status == 200) {
                                                dispatch(userAction.createStore(result.data.data))
                                                localStorage.setItem('token', result.data.token)
                                                message.success(result.data.message)
                                                return true
                                            } else {
                                                message.error(result.data.message)
                                            }
                                        } else {
                                            throw false
                                        }
                                    } catch (err) {
                                        message.error('Thay đổi mật khẩu thất bại , mời thử lại sau')
                                    }
                                }}
                            >
                                <ProForm.Group style={{ margin: "10px 0px" }}>
                                    <ProFormText
                                        width="md"
                                        name="oldPassword"
                                        label="Nhập mật khẩu cũ"
                                        tooltip="Tối đa 16 ký tự"
                                        placeholder="Mật khẩu cũ"
                                        required
                                    />
                                    <ProFormText
                                        width="md"
                                        name="newPassword"
                                        label="Nhập mật khẩu mới"
                                        tooltip="Tối đa 16 ký tự"
                                        placeholder="Mật khẩu mới"
                                        required
                                    />
                                </ProForm.Group>
                            </ModalForm>



                            <ModalForm<{
                                newPhone: string,
                                oldPhone: string
                            }>
                                title="Thêm mới"
                                trigger={
                                    <span>Đổi SĐT</span>
                                }
                                form={editPhoneForm}
                                autoFocusFirstInput
                                variant="filled"
                                modalProps={{
                                    destroyOnClose: true,
                                }}
                                submitTimeout={2000}
                                onFinish={async (values) => {
                                    await waitTime(2000);
                                    try {
                                        if (userDetail != null) {
                                            const result = await apis.userApiModule.updatePhoneUser({ userId: userDetail.id, old: values.oldPhone, new: values.newPhone })
                                            if (result.status == 200) {
                                                dispatch(userAction.createStore(result.data.data))
                                                localStorage.setItem('token', result.data.token)
                                                message.success(result.data.message)
                                                return true
                                            } else {
                                                message.error(result.data.message)
                                            }
                                        } else {
                                            throw false
                                        }
                                    } catch (err) {
                                        message.error('Thay đổi SĐT thất bại , mời thử lại sau')
                                    }
                                }}
                            >
                                <ProForm.Group style={{ margin: "10px 0px" }}>
                                    <ProFormText
                                        width="md"
                                        name="oldPhone"
                                        label="Nhập SĐT cũ"
                                        // tooltip="Tối đa 16 ký tự"
                                        placeholder="SĐT cũ"
                                        required
                                    />
                                    <ProFormText
                                        width="md"
                                        name="newPhone"
                                        label="Nhập SĐT mới"
                                        // tooltip="Tối đa 16 ký tự"
                                        placeholder="SĐT mới"
                                        required
                                    />
                                </ProForm.Group>
                            </ModalForm>




                            {userDetail?.id &&
                                <span onClick={() => {
                                    showConfirm("Bạn chắc chắn muốn đăng xuất chứ?")
                                }}>Thoát</span>}
                        </div>
                    </div>
                </section>
            </div>




        </header>
    )
}
