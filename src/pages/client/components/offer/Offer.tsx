// import React from 'react'
// import './offer.scss'
// import { useState, useEffect } from 'react';


// export default function Offer() {
  
//     const [days, setDays] = useState(0);
//     const [hours, setHours] = useState(0);
//     const [minutes, setMinutes] = useState(0);
//     const [seconds, setSeconds] = useState(0);
  
//     const currentYear = new Date().getFullYear();
  
//     const newYearTime = new Date(`November 30 ${currentYear} 00:00:00:00`);
  
//     // Update countdown time
//     useEffect(() => {
//       const updateCountdown = () => {
//         const currentTime = new Date();
//         const diff = newYearTime - currentTime;
  
//         const d = Math.floor(diff / 1000 / 60 / 60 / 24);
//         const h = Math.floor(diff / 1000 / 60 / 60) % 24;
//         const m = Math.floor(diff / 1000 / 60) % 60;
//         const s = Math.floor(diff / 1000) % 60;
  
//         setDays(d);
//         setHours(h < 10 ? '0' + h : h);
//         setMinutes(m < 10 ? '0' + m : m);
//         setSeconds(s < 10 ? '0' + s : s);
  
//         if (d === 0 && h === 0 && m === 0 && s === 0) {
//           alert("Chương trình giảm giá 50% sách đã kết thúc");
//           // You can implement your logic to hide products here.
//         } else {
//           // You can implement your logic for products on sale here.
//         }
//       };
  
//       const interval = setInterval(updateCountdown, 1000);
  
//       return () => clearInterval(interval);
//     }, []);

 
//     return (
//         <div className='home_offer'>
//             <section
//                 id="section-goto-offer"
//                 className="section offer has-bg-image"
//                 aria-label="special offer"
//                 style={{ backgroundImage: 'url("./assets/images/section-bg.jpg")' }}
//             >
//                 <div className="container">
//                     {/* title */}
//                     <p className="section-subtitle">Ưu Đãi Đặc Biệt</p>
//                     <h2 className="h2 section-title">
//                         Tất cả điện thoại Xiaomi đều giảm 30% giá! Đừng bỏ lỡ cơ hội này!
//                     </h2>
//                     <p className="section-text">
//                         Bạn có thể mua được những chiếc điện thoại Xiaomi được giảm 30% trong
//                     </p>
//                     {/* count down */}
//                     <ul className="countdown-list">
//                         <li>
//                             <p className="countdown-time" id="days">
//                             {days}
//                             </p>
//                             <p className="countdown-label">Days</p>
//                         </li>
//                         <li>
//                             <p className="countdown-time" id="hours">
//                             {hours}
//                             </p>
//                             <p className="countdown-label">Hour</p>
//                         </li>
//                         <li>
//                             <p className="countdown-time" id="minutes">
//                             {minutes}
//                             </p>
//                             <p className="countdown-label">Min</p>
//                         </li>
//                         <li>
//                             <p className="countdown-time" id="seconds">
//                             {seconds}
//                             </p>
//                             <p className="countdown-label">Sec</p>
//                         </li>
//                     </ul>
//                     <a href="#render_page_brand" className="btn">
//                         Tìm hiểu thêm
//                     </a>
//                 </div>
//             </section>

//         </div>
//     )
// }


import React, { useState, useEffect } from 'react';
import './offer.scss';

export default function Offer(): JSX.Element {
    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number | string>(0);
    const [minutes, setMinutes] = useState<number | string>(0);
    const [seconds, setSeconds] = useState<number | string>(0);

    const currentYear: number = new Date().getFullYear();

    const newYearTime: Date = new Date(`March 30 ${currentYear} 00:00:00:00`);

    // Update countdown time
    useEffect(() => {
        const updateCountdown = () => {
            const currentTime: Date = new Date();
            const diff: number = newYearTime.getTime() - currentTime.getTime();

            const d: number = Math.floor(diff / 1000 / 60 / 60 / 24);
            const h: number = Math.floor(diff / 1000 / 60 / 60) % 24;
            const m: number = Math.floor(diff / 1000 / 60) % 60;
            const s: number = Math.floor(diff / 1000) % 60;

            setDays(d);
            setHours(h < 10 ? '0' + h : h);
            setMinutes(m < 10 ? '0' + m : m);
            setSeconds(s < 10 ? '0' + s : s);

            if (d === 0 && h === 0 && m === 0 && s === 0) {
                alert("Chương trình giảm giá 50% sách đã kết thúc");
                // You can implement your logic to hide products here.
            } else {
                // You can implement your logic for products on sale here.
            }
        };

        const interval: NodeJS.Timeout = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='home_offer'>
            <section
                id="section-goto-offer"
                className="section offer has-bg-image"
                aria-label="special offer"
                // style={{ backgroundImage: 'url("./assets/images/section-bg.jpg")' }}
                
            >
                <div className="container">
                    {/* title */}
                    <p className="section-subtitle">Ưu Đãi Đặc Biệt</p>
                    <h2 className="h2 section-title">
                        Tất cả điện thoại Xiaomi đều giảm 30% giá! Đừng bỏ lỡ cơ hội này!
                    </h2>
                    <p className="section-text">
                        Bạn có thể mua được những chiếc điện thoại Xiaomi được giảm 30% trong
                    </p>
                    {/* count down */}
                    <ul className="countdown-list">
                        <li>
                            <p className="countdown-time" id="days">
                                {days}
                            </p>
                            <p className="countdown-label">Days</p>
                        </li>
                        <li>
                            <p className="countdown-time" id="hours">
                                {hours}
                            </p>
                            <p className="countdown-label">Hour</p>
                        </li>
                        <li>
                            <p className="countdown-time" id="minutes">
                                {minutes}
                            </p>
                            <p className="countdown-label">Min</p>
                        </li>
                        <li>
                            <p className="countdown-time" id="seconds">
                                {seconds}
                            </p>
                            <p className="countdown-label">Sec</p>
                        </li>
                    </ul>
                    <a href="#" className="btn">
                        Tìm hiểu thêm
                    </a>
                </div>
            </section>
        </div>
    );
}
