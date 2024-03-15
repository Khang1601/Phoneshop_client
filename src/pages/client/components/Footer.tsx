// import './scss/footer.scss'



// export default function Footer() {
//   return (
//     <section className='footer_container'>
//       <div className='footer_top'>
//         <div className='footer_list'>
//           <span>Giới thiệu về Blade</span>
//           <ul>
//             <li>Về chúng tôi</li>
//             <li>Tài nguyên và chính sách</li>
//             <li>Liên hệ với chúng tôi</li>
//           </ul>
//         </div>
//         <div className='footer_list'>
//           <span>Đối tác</span>
//           <ul>
//             <li>Đăng ký nhà cung cấp</li>
//             <li>Đối tác đăng nhập</li>
//             <li>Đối tác liên kết</li>
//             <li>Chương trình cho đại lý</li>
//           </ul>
//         </div>
//         <div className='footer_list'>
//           <span>Liên hệ</span>
//           <p>Địa chỉ : tầng 3 toà nhà ASC , đường Lê Trung Nghĩa , phường ??? , quận Tân Bình , thành phố Hồ Chí Minh</p>
//           <p>Số điện thoại : 0767552364</p>
//         </div>
//         <div className='footer_subcribe'>
//           <input type="text" placeholder='example@gmail.com'/>
//           <button>Subcribe</button>
//         </div>
//       </div>
//       <div className='footer_bottom'>
//         <div className='footer_social'>
//           <i className="fa fa-instagram social_icon"></i>
//           <i className="fa fa-facebook-official social_icon"></i>
//           <i className="fa fa-youtube social_icon"></i>
//         </div>
//         <p>© 2024 BladeTravel, Inc.</p>
//       </div>
//     </section>
//   )
// }

import React from 'react';
import './scss/footer.scss';


export default function Footer(): JSX.Element {
    return (
        <div className='home_footer'>
            <footer
                className="home_footer_content"
            >
                <div className="footer-top">
                    <div className="container grid-list">
                        <div className="footer-brand">
                            {/* <a href="#" className="logo">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/438/438560.png"
                                    alt="lapshop home"
                                />
                            </a> */}
                            <p className="footer-text">
                                PhoneShop nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt
                                mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống
                                PhoneShop trên toàn quốc.
                            </p>
                            <ul className="social-list">
                                <li>
                                    <a href="#" className="social-link">
                                        {/* <ion-icon name="items logo-facebook" /> */}
                                        <i className="fa-brands fa-facebook"></i>

                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="social-link">
                                        {/* <ion-icon name="logo-twitter" /> */}
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="social-link">
                                        {/* <ion-icon name="logo-instagram" /> */}
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="social-link">
                                        {/* <ion-icon name="logo-youtube" /> */}
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="social-link">
                                        {/* <ion-icon name="logo-pinterest" /> */}
                                        <i className="fa-brands fa-pinterest"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <ul className="footer-list">
                            <li>
                                <p className="footer-list-title">DỊCH VỤ</p>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Điều khoản sử dụng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Hệ thống cửa hàng
                                </a>
                            </li>
                        </ul>

                        <ul className="footer-list">
                            <li>
                                <p className="footer-list-title">HỖ TRỢ</p>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Chính sách bảo hành
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Chính sách vận chuyển
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Phương thức thanh toán
                                </a>
                            </li>
                        </ul>
                        <ul className="footer-list">
                            <li>
                                <p className="footer-list-title">TÀI KHOẢN</p>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Đăng nhập
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Tạo mới tài khoản
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Lịch sử mua hàng
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="section-goto-contact" className="footer-bottom">
                    <div className="footer-bottom-list">
                        <p className="copyright">Web được thiết kế bởi Nguyễn Đình Khang</p>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/testfirebase-d283a.appspot.com/o/products%2Fpayment-method.png?alt=media&token=90903113-5e7e-47ea-b98a-5e3fe39a6189&_gl=1*7auup1*_ga*MTExNDg3OTg4OC4xNjg5Nzg4MTUx*_ga_CW55HF8NVT*MTY5NjUyMTAwMC4xOS4xLjE2OTY1MjEwNjguNTIuMC4w"
                            loading="lazy"
                            alt="Payment method"
                            className="w-100"
                        />
                    </div>
                </div>
            </footer>
        </div>
    );
}
