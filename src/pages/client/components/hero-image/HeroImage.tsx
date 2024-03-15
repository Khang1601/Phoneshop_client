// import React from 'react'
// import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS của Bootstrap

// import "./hero.scss"

// export default function Hero() {
//     return (
//         <div className='home_hero' >
//             <div className='home_hero_carousel'>
//                 <Carousel>
//                     <Carousel.Item interval={2000}>
//                         <img
//                             className="d-block w-100"
//                             src="https://lh3.googleusercontent.com/mlnMS42lT2mjHnjtITE69i8fqQPZnnF9s9WaoSXBH6sYBxpMxAq5f_TYrl4eYuyFPkx8HnZc9wHJfeb7uVoTp2PV8EAQ5PFx=rw-w1920"
//                             alt="First slide"
                       
//                         />
//                     </Carousel.Item>
//                     <Carousel.Item interval={2000}>
//                         <img
//                             className="d-block w-100"
//                             src="https://laptopaz.vn/media/banner/23_Aug1c2ec0138f3726988d730fe8c8895087.jpg"
//                             alt="Second slide"
                          
//                         />
//                     </Carousel.Item>
//                     <Carousel.Item interval={2000}>
//                         <img
//                             className="d-block w-100"
//                             src='https://laptopaz.vn/media/banner/11_Aug29a74558ff9902e013ca718f69d10683.jpg'
//                             alt="Third slide"
                         
//                         />
//                     </Carousel.Item>
//                     <Carousel.Item interval={2000}>
//                         <img
//                             className="d-block w-100"
//                             src='https://laptopaz.vn/media/banner/26_Sep6c49e4f4f148bb193718efd5c21c9e35.jpg'
//                             alt="Fourth slide"
                         
//                         />
//                     </Carousel.Item>
//                     <Carousel.Item interval={2000}>
//                         <img
//                             className="d-block w-100"
//                             src='https://laptopaz.vn/media/banner/20_Jul5af860a292a1754b0f23b8b7ff1023f5.jpg'
//                             alt="Fifth slide"
                         
//                         />
//                     </Carousel.Item>
//                     <Carousel.Item interval={2000}>
//                         <img
//                             className="d-block w-100"
//                             src='https://laptopaz.vn/media/banner/26_Apr767cc1af5767401ee423d76bc9ff4775.jpg'
//                             alt="Sixth slide"
                         
//                         />
//                     </Carousel.Item>
//                 </Carousel>
//             </div>

//             <div className='home_hero_img'>
//                 <img src="https://cdn.tgdd.vn/2023/04/banner/itelintel-390x97.png" alt="" />
//                 <img src="https://cdn.tgdd.vn/2023/02/banner/laptop-xa-kho-390-97-390x97.png" alt="" />
//                 <img src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/10/1/638317566656667087_F-C1_1200x300.png" alt="" />
//                 <img src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/9/7/638296781699171482_F-C1_1200x300.png" alt="" />

//             </div>
//         </div>
//     )
// }


import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS của Bootstrap

import "./hero-image.scss";

export default function Hero(): JSX.Element {
    return (
        <div className='home_hero' >
            <div className='home_hero_carousel'>
                <Carousel>
                    {/* <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src="https://cdn.mobilecity.vn/mobilecity-vn/images/2023/09/w800/anh-slide-xiaomi-redmi-note-13-series.jpg.webp"
                            alt="First slide"
                        />
                    </Carousel.Item> */}
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src="https://clickbuy.com.vn/uploads/media/613-MXCbb.png?v=2"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src='https://clickbuy.com.vn/uploads/media/605-YXQnp.png?v=2'
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src='https://cdn2.viettelstore.vn/images/Advertises/Main_PC-(9)_65921390802032024.jpg'
                            alt="Fourth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src='https://cdn.mobilecity.vn/mobilecity-vn/images/2023/12/w800/banner-realme-gt-neo-5se.jpg.webp'
                            alt="Fourth slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            
            <div className='home_hero_img'>
                <img src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638449295289515582_F-C1_1200x300.png" alt="" />
                <img src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/9/638455866580642157_F-C1_1200x300@2x.png" alt="" />
                <img src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638448506481058464_F-C1_1200x300.png" alt="" />
                <img src="https://bizweb.dktcdn.net/100/398/567/themes/916462/assets/collection_banner.jpg?1697595133050" alt="" />
            </div>
        </div>
    );
}
