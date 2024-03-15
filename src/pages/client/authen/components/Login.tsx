// import { api } from "@/services/apis";
import React, { useState, useEffect } from "react";
// import utils from '@utils/index'
import { Spin, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// import { User } from "firebase/auth";


//---
import { message } from 'antd';
import { apis } from "@/service/apis";
import { GoogleOutlined } from "@ant-design/icons";
import firebase from "@/firebase";
import { useDispatch } from "react-redux";
import { userAction } from "@/store/slices/loginDetail.slice";
import { useNavigate, useParams } from "react-router-dom"



// interface UserGoogle extends User {
//     accessToken: string;
// }

export default function Login() {
    const [load, setLoad] = useState(false);


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

    const [messageApi, contextHolder] = message.useMessage();
    const errorMessage = (errorText: string) => {
        messageApi.open({
            type: 'error',
            content: errorText,
        });
    };

    const successMessage = (informText: string) => {
        messageApi.open({
            type: 'success',
            content: informText,
        });
    };

    //----------------------------------------------------------------
    //Hàm xử lý đăng nhập
    const dispatch = useDispatch();
    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        let loginInfo = {
            email: (e.target as any).loginId.value,
            password: (e.target as any).password.value
        }
        try {
            let loginResult = await apis.userApiModule.loginByAccount(loginInfo)
            if (loginResult.status == 200) {
                successMessage(loginResult.data.message)
                dispatch(userAction.createStore(loginResult.data.info))
                localStorage.setItem("token", loginResult.data.token)

                setTimeout(() => { window.location.href = "/" }, 500)
            } else {
                errorMessage(loginResult.data.message)
                return
            }
        } catch (error) {


            errorMessage("Lỗi gì rồi nhỉ? thôi thử lại sau nhé")
        }
    }



    return (
        <div className="form-container sign-in-container">
            {contextHolder}
            <form className="login_form" action="" onSubmit={(e: React.SyntheticEvent) => {

                handleLogin(e)
            }}>

                <h1>Sign in</h1>

                <div className="social-container">
                    <a href="#" className="social">
                        <i className="fab fa-facebook-f" />
                    </a>

                    {/* <a onClick={async () => {
                        try {
                            if (load) return
                            setLoad(true)
                            let googleRes = await utils.firebase.handleLoginWithGoogle()
                            let result = await api.userApi.loginGoogle({
                                token: (googleRes.user as UserGoogle).accessToken
                            })
                            localStorage.setItem("token", result.data.token)
                            Modal.success({
                                title: "Thông báo",
                                content: "Đăng nhập thành công, comeback homepage",
                                onOk: () => {
                                    window.location.href = "/"
                                }
                            })
                            setLoad(false)
                        } catch (err) {
                            console.log("err", err)
                            setLoad(false)
                            Modal.error({
                                title: "Thông báo",
                                content: "Đăng nhập với google phát sinh vấn đề, vui lòng thử lại."
                            })
                        }
                    }} className="social">
                        <i className="fab fa-google-plus-g" />
                    </a> */}

                    <a href="#" className="social">
                        <i className="fab fa-linkedin-in" />
                    </a>
                </div>


                <span>or use your account</span>
                <input type="text" placeholder="Username/Email" name="loginId" />
                <input type="password" placeholder="Password" name="password" />
                <a href="#">Forgot your password?</a>
                <div className="div_btn_load_box">
                    <button type="submit">Sign In</button>
                    {
                        load && (
                            <div className="btn_box">
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                            </div>
                        )
                    }
                </div>
            </form>
        </div>


        // <div className="form-container sign-in-container">
        //     <form onSubmit={async (e: React.FormEvent) => {
        //         e.preventDefault();
        //         try {
        //             let data = {
        //                 loginId: (e.target as any).loginId.value,
        //                 password: (e.target as any).password.value
        //             }
        //             let res = await api.userApi.login(data)
        //             localStorage.setItem("token", res.data.token)
        //             Modal.success({
        //                 title: "Thông báo",
        //                 content: "Đăng nhập thành công, comeback homepage",
        //                 onOk: () => {
        //                     window.location.href = "/"
        //                 }
        //             })
        //         } catch (err: any) {
        //             Modal.warning({
        //                 title: "Thông báo",
        //                 content: err?.response?.data?.message
        //             })
        //         }
        //     }}>
        //         <h1>Sign in</h1>
        //         <div className="social-container">
        //             <a href="#" className="social">
        //                 <i className="fab fa-facebook-f" />
        //             </a>
        //             <a onClick={async () => {
        //                 try {
        //                     if (load) return
        //                     setLoad(true)
        //                     let googleRes = await utils.firebase.handleLoginWithGoogle()
        //                     let result = await api.userApi.loginGoogle({
        //                         token: (googleRes.user as UserGoogle).accessToken
        //                     })
        //                     localStorage.setItem("token", result.data.token)
        //                     Modal.success({
        //                         title: "Thông báo",
        //                         content: "Đăng nhập thành công, comeback homepage",
        //                         onOk: () => {
        //                             window.location.href = "/"
        //                         }
        //                     })
        //                     setLoad(false)
        //                 } catch (err) {
        //                     console.log("err", err)
        //                     setLoad(false)
        //                     Modal.error({
        //                         title: "Thông báo",
        //                         content: "Đăng nhập với google phát sinh vấn đề, vui lòng thử lại."
        //                     })
        //                 }
        //             }} className="social">
        //                 <i className="fab fa-google-plus-g" />
        //             </a>
        //             <a href="#" className="social">
        //                 <i className="fab fa-linkedin-in" />
        //             </a>
        //         </div>
        //         <span>or use your account</span>
        //         <input type="text" placeholder="Username/Email" name="loginId" />
        //         <input type="password" placeholder="Password" name="password" />
        //         <a href="#">Forgot your password?</a>
        //         <div className="div_btn_load_box">
        //             <button type="submit">Sign In</button>
        //             {
        //                 load && (
        //                     <div className="btn_box">
        //                         <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        //                     </div>
        //                 )
        //             }
        //         </div>
        //     </form>
        // </div>
    )
}
