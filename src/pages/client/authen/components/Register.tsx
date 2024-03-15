// import { UserCreate } from "@/interfaces/user.interface";
// import { api } from "@/services/apis";
import { Modal, message } from "antd";
import { MutableRefObject } from "react";


//---
import { apis } from "@/service/apis";
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { GoogleOutlined } from "@ant-design/icons";
import firebase from "@/firebase";
import { useDispatch } from "react-redux";
import { userAction } from "@/store/slices/loginDetail.slice";



export default function Register({ containerRef }: {
    containerRef: MutableRefObject<any>
}) {

    //---
    const navigate = useNavigate()
    useEffect(() => {
        checkLogin()
    }, [])
    //checkLogin
    const checkLogin = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const result = await apis.userApiModule.checkLogin(token)
                if (result.status == 200) {
                    navigate("/")
                } else {
                    localStorage.removeItem("token")
                }
            } catch (error) {

            }
        }
    }

    // ANTD components
    // >Error Message
    const [messageApi, contextHolder] = message.useMessage();
    const errorMessage = (errorText: string) => {
        messageApi.open({
            type: 'error',
            content: errorText,
        });
    };
    // >Success Message
    const successMessage = (informText: string) => {
        messageApi.open({
            type: 'success',
            content: informText,
        });
    };

    const { pageFn } = useParams()

    //Validate
    const [emailError, setEmailError] = useState("")
    const [emailValue, setEmailValue] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [passValue, setPassValue] = useState("")
    const [passVision, setPassVision] = useState(false)
    const [confirmPassError, setConfirmPassError] = useState("")
    const [confirmPassVision, setConfirmPassVision] = useState(false)
    const [phoneValue, setPhoneValue] = useState("")
    const [phoneError, setPhoneError] = useState("")

    // Bước kiểm tra dữ liệu nhập lúc đăng ký
    const firstStepVerify = async (e: React.SyntheticEvent) => {
        //vô hiệu hoá tính năng reload của Form.Event
        e.preventDefault();

        let verifyFlag = true;
        //Kiểm tra định dạng Email
        let validateEmail = {
            isEmail: function (emailString: string) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
            }
        }

        if ((e.target as any).register_email.value == "") {
            verifyFlag = false;
            setEmailValue((e.target as any).register_email.value)
            setEmailError("Email không được để trống!")
        } else {
            if (!validateEmail.isEmail((e.target as any).register_email.value)) {
                verifyFlag = false;
                setEmailValue((e.target as any).register_email.value)
                setEmailError("Email chưa đúng định dạng!")
            } else {
                setEmailValue((e.target as any).register_email.value)
                setEmailError("")
            }
        }

        //Kiểm tra định dạng Mật Khẩu
        if ((e.target as any).register_pass.value == "") {
            verifyFlag = false;
            setPassValue((e.target as any).register_pass.value)
            setPasswordError("Mật khẩu không được để trống!")
        } else {
            if ((e.target as any).register_pass.value.length < 3) {
                verifyFlag = false;
                setPassValue((e.target as any).register_pass.value)
                setPasswordError("Mật khẩu không ít hơn 3 ký tự!")
            } else {

                if ((e.target as any).register_pass.value.length > 10) {
                    verifyFlag = false;
                    setPassValue((e.target as any).register_pass.value)
                    setPasswordError("Mật khẩu không quá 10 ký tự!")
                } else {
                    setPassValue((e.target as any).register_pass.value)
                    setPasswordError("")
                }
            }
        }

        //Kiểm tra xác nhận mật khẩu
        if ((e.target as any).register_passConfirm.value == "") {
            verifyFlag = false;
            setConfirmPassError("Xác nhận mật khẩu không được để trống!")
        } else {
            if ((e.target as any).register_passConfirm.value != (e.target as any).register_pass.value) {
                verifyFlag = false;
                setConfirmPassError("Mật khẩu không khớp!")
            } else {
                setConfirmPassError("")
            }
        }

        //Kiểm tra định dạng số điện thoại
        if ((e.target as any).register_phone.value == "") {
            verifyFlag = false;
            setPhoneValue((e.target as any).register_phone.value)
            setPhoneError("Số điện thoại không được để trống!")
        } else {
            if (isNaN(Number((e.target as any).register_phone.value))) {
                verifyFlag = false;
                setPhoneValue((e.target as any).register_phone.value)
                setPhoneError("Số điện thoại không hợp lệ! (number only)")
            }
            else {
                if ((e.target as any).register_phone.value.length != 10) {
                    verifyFlag = false;
                    setPhoneValue((e.target as any).register_phone.value)
                    setPhoneError("Số điện thoại chuẩn phải có 10 số!")
                } else {
                    setPhoneValue((e.target as any).register_phone.value)
                    setPhoneError("")
                }
            }
        }

        //Nếu dữ liệu k đúng định dạng thì đình chỉ hàm
        if (!verifyFlag) {
            return
        }

        //Nếu dữ liệu đúng định dạng thì kiểm tra dữ liệu đã từng đăng ký hay chưa
        const checkExistData = {
            email: emailValue,
            phone: phoneValue
        }

        try {
            const result = await apis.userApiModule.checkExist(checkExistData)

            if (result.status == 200) {
                document.querySelector(".authSite_right")?.classList.add("active_avatar")
            } else {
                errorMessage(result.data.message)
                return
            }
        } catch (error) {
            errorMessage(String(error))
            return
        }
    }

    // const [avatarFile, setAvatarFile] = useState(null);
    const [avatarFile, setAvatarFile] = useState("https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg");


    //Đăng ký
    const handleRegister = async () => {
        const newUserDetail = {
            email: emailValue,
            password: passValue,
            phone: phoneValue
        }

        let userFormData = new FormData();
        userFormData.append("data", JSON.stringify(newUserDetail))
        userFormData.append("avatar", avatarFile as any)
        try {
            const result = await apis.userApiModule.createNew(userFormData)
            if (result.status == 200) {
                document.querySelector(".authSite_right")?.classList.add("active_success")
            } else {
                errorMessage(result.data.message)
            }
        } catch (error) {
            errorMessage(String(error))
        }
    }

    const dispatch = useDispatch();





    // async function handleRegister(e: React.FormEvent) {
    //     e.preventDefault();
    //     try {
    //         let newUser: UserCreate = {
    //             userName: (e.target as any).userName.value,
    //             email: (e.target as any).email.value,
    //             password: (e.target as any).password.value,
    //             avatar: "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
    //         }
    //         // await api.userApi.register(newUser);
    //         await apis.userApi.register(newUser);

    //         Modal.success({
    //             title: "Thông Báo",
    //             content: "Tạo tài khoản thành công",
    //             onOk: () => {
    //                 containerRef.current.classList.remove("right-panel-active");
    //             }
    //         })
    //     }catch(err: any) {
    //         message.error(err?.response?.data?.message || "Loi server")
    //     }
    // }



    return (
        <div className="form-container sign-up-container">
            {contextHolder}

            <form className="register_form" action="" onSubmit={(e: React.FormEvent) => {

                // handleRegister(e)

                firstStepVerify(e)
            }}>
                <h1>Create Account</h1>
                <div className="social-container">
                    <a href="#" className="social">
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-google-plus-g" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-linkedin-in" />
                    </a>
                </div>

                <span>or use your email for registration</span>

                {/* <input type="text" placeholder="User name" name="userName"/>
                <input type="email" placeholder="Email" name="email"/>
                <input type="password" placeholder="Password" name="password"/>
                <input type="password" placeholder="Password" name="password"/> */}

                <input type="text" placeholder="Email" name="register_email" onChange={() => {
                    setEmailError("")
                }} />

                <input type="text" placeholder="Password" name="register_pass" onChange={() => {
                    setPasswordError("")
                }} />

                <input type="text" placeholder="Confirm Password" name="register_passConfirm" onChange={() => {
                    setConfirmPassError("")
                }} />


                <input type="text" placeholder="Phone Number" name="register_phone" onChange={() => {
                    setPhoneError("")
                }} />

                <button type="submit">Sign Up</button>


            </form>
        </div>

    )
}












{/* <div className="form-container sign-up-container">
{contextHolder}

   <form className="register_form" action="" onSubmit={(e: React.FormEvent) => {

       handleRegister(e)

       firstStepVerify(e)
   }}>
       <h1>Create Account</h1>
       <div className="social-container">
           <a href="#" className="social">
               <i className="fab fa-facebook-f" />
           </a>
           <a href="#" className="social">
               <i className="fab fa-google-plus-g" />
           </a>
           <a href="#" className="social">
               <i className="fab fa-linkedin-in" />
           </a>
       </div>

       <span>or use your email for registration</span>

       <input type="text" placeholder="User name" name="userName"/>
       <input type="email" placeholder="Email" name="email"/>
       <input type="password" placeholder="Password" name="password"/>
       <input type="password" placeholder="Password" name="password"/>

       <button type="submit">Sign Up</button>


   </form>
</div> */}