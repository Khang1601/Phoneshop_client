import { apis } from '@/service/apis'
import './adminAuth.scss'

// import './adminAuth'

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
        // <section className='pageConstruct'>
        //     {contextHolder}
        //     <div className='adminAuth'>
        //         <h2>Đăng nhập Admin</h2>


        //         <form className='admin_loginForm' onSubmit={(e: React.FormEvent<HTMLFormElement>) => { handleAdminLogin(e) }}>
        //             <label htmlFor="admin_username">Tài Khoản</label>
        //             <input className='admin_input' id='admin_username' type="text" name='username' autoComplete='off' />

        //             <label htmlFor="admin_password">Mật Khẩu</label>
        //             <input className='admin_input' id='admin_password' type="password" name='password' autoComplete='off' />
        //             <div className='btnBox'>
        //                 <button type='submit' className='admin_loginBtn'>Đăng Nhập</button>
        //             </div>
        //         </form>
        //     </div>
        // </section>

        <div className="page">
            <div className="container">
                <div className="left">
                    <div className="login">Login</div>
                    <div className="eula">
                        By logging in you agree to the ridiculously long terms that you didn't
                        bother to read
                    </div>
                </div>

                <div className="right">
                    <svg viewBox="0 0 320 300">
                        <defs>
                            <linearGradient
                                // inkscape:collect="always"
                                {...({ 'inkscape:collect': 'always' } as React.SVGProps<SVGLinearGradientElement>)}
                                id="linearGradient"
                                x1={13}
                                y1="193.49992"
                                x2={307}
                                y2="193.49992"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop style={{ stopColor: "#ff00ff" }} offset={0} id="stop876" />
                                <stop style={{ stopColor: "#ff0000" }} offset={1} id="stop878" />
                            </linearGradient>
                        </defs>
                        <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
                    </svg>

                    <div className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => { handleAdminLogin(e) }}>
                        <label htmlFor="admin_username">Tài Khoản</label>
                        <input type="text" id="admin_username" />

                        <label htmlFor="admin_password">Mật Khẩu</label>
                        <input type="password" id="admin_password" />
                        <input type="submit" id="submit" defaultValue="Submit" />
                    </div>
                </div>
            </div>
        </div>
    )
}
