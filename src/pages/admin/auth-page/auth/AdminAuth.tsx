import { apis } from '@/service/apis'
import './adminAuth.scss'
// import bckGrdImg from '@pics/adminAuthBckg.jpeg'
import { message } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminAction } from '@/store/slices/adminLoginDetail.slice';
import React from 'react';

export default function AdminAuth() {
    const dispatch = useDispatch()
    useEffect(() => {
        checkLogin()
    }, [])
    const navigate = useNavigate()
    //checkLogin
    const checkLogin = async () => {
        const admin_token = localStorage.getItem('admin_token')
        if (admin_token) {
            try {
                const result = await apis.adminApiModule.checkLogin(admin_token)
                if (result.status == 215) {
                    localStorage.removeItem("admin_token")
                    message.warning("Phiên làm việc trước đã quá hạn mời đăng nhập lại")
                }
                if (result.status == 200) {
                    navigate("/admin")
                }
            } catch (error) {
                console.log("error", error);

            }
        }
    }

    // >Success Message
    const [messageApi, contextHolder] = message.useMessage();
    const successMessage = (informText: string) => {
        messageApi.open({
            type: 'success',
            content: informText,
        });
    };
    // >Error Message
    const errorMessage = (errorText: string) => {
        messageApi.open({
            type: 'error',
            content: errorText,
        });
    };

    const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const adminLoginDetail = {
            username: (e.target as any).admin_username.value,
            password: (e.target as any).admin_password.value
        }
        const result = await apis.adminApiModule.login(adminLoginDetail)
        if (result.status == 200) {
            successMessage(result.data.message)
            localStorage.setItem('admin_token', result.data.token)
            dispatch(adminAction.createStore(result.data.data))
            setTimeout(() => {
                navigate('/admin')
            }, 1000);
        } else {
            errorMessage(result.data.message)
        }
    }

    return (





        <div className="wrapper animated bounce">

            {/* <section className='pageConstruct'>


                {contextHolder}

                <div className='adminAuth'>
                    <h2>Đăng nhập</h2>
                    <form className='admin_loginForm' onSubmit={(e: React.FormEvent<HTMLFormElement>) => { handleAdminLogin(e) }}>
                        <label htmlFor="admin_username">Tài Khoản</label>
                        <input className='admin_input' id='admin_username' type="text" name='username' autoComplete='off' />

                        <label htmlFor="admin_password">Mật Khẩu</label>
                        <input className='admin_input' id='admin_password' type="password" name='password' autoComplete='off' />
                        <div className='btnBox'>
                            <button type='submit' className='admin_loginBtn'>Đăng Nhập</button>
                        </div>
                    </form>
                </div>
            </section> */}

            <h1>Admin login</h1>
            <hr />

            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { handleAdminLogin(e) }}>
                <label id="icon" htmlFor="admin_username">
                    <i className="fa fa-user" />
                </label>
                <input type="text" placeholder="Username" id="admin_username" name='username' />

                <label id="icon" htmlFor="admin_password">
                    <i className="fa fa-key" />
                </label>
                <input type="password" placeholder="Password" id="admin_password" name='password' />


                <button type="submit" >Đăng Nhập</button>


                <hr />
                <div className="crtacc" >
                    {/* <a href="#" onClick={ () => { navigate('/')}}>Come back Home</a> */}
                    <a href="#" onClick={ () => { window.location.href = "/"; }}>Come back Home</a>

                </div>
            </form>

        </div>



    )
}
