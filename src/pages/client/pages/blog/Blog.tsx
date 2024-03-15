import React from 'react'
import './blog.scss'

export default function Blog() {
    return (
        <>
            {/*blog start */}
            <section id="blog" className="blog">
                <div className="container">
                    <div className="section-header">
                        <h2 className='blog-title'>Blog mới</h2>
                    </div>
                    {/*/.section-header*/}
                    <div className="blog-content">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="single-blog">
                                    <div className="single-blog-img">
                                        <img src="https://cdn.tgdd.vn/Files/2023/08/06/1541395/smartphone-tgdd-33312313-2-060823-210136-800-resize.jpg" alt="blog image" />
                                        <div className="single-blog-img-overlay" />
                                    </div>
                                    <div className="single-blog-txt">
                                        <h2>
                                            <a href="#">Why Brands are Looking at Local Language</a>
                                        </h2>
                                        <h3>
                                            <a href="#">Nguyễn A</a> / 18th March 2024
                                        </h3>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus vel voluptatum ea quaerat atque suscipit adipisci aliquam! Excepturi suscipit sint ad vel ratione, commodi, voluptate itaque, provident corrupti quibusdam dolor.
                                            Temporibus, ullam excepturi. Aspernatur 
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="single-blog">
                                    <div className="single-blog-img">
                                        <img src="https://cafefcdn.com/203337114487263232/2023/3/30/image7-16801558742621304005333-1680172546166-1680172546273365774372.jpg" alt="blog image" />
                                        <div className="single-blog-img-overlay" />
                                    </div>
                                    <div className="single-blog-txt">
                                        <h2>
                                            <a href="#">Why Brands are Looking at Local Language</a>
                                        </h2>
                                        <h3>
                                            <a href="#">Trần B</a> / 18th March 2024
                                        </h3>
                                        <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus vel voluptatum ea quaerat atque suscipit adipisci aliquam! Excepturi suscipit sint ad vel ratione, commodi, voluptate itaque, provident corrupti quibusdam dolor.
                                        Temporibus, ullam excepturi. Aspernatur...
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="single-blog">
                                    <div className="single-blog-img">
                                        <img src="https://www.techadvisor.com/wp-content/uploads/2024/02/best-smartphones-2024-1.jpg?quality=50&strip=all" alt="blog image" />
                                        <div className="single-blog-img-overlay" />
                                    </div>
                                    <div className="single-blog-txt">
                                        <h2>
                                            <a href="#">Why Brands are Looking at Local Language</a>
                                        </h2>
                                        <h3>
                                            <a href="#">Lê C</a> / 18th March 2024
                                        </h3>
                                        <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus vel voluptatum ea quaerat atque suscipit adipisci aliquam! Excepturi suscipit sint ad vel ratione, commodi, voluptate itaque, provident corrupti quibusdam dolor.
                                        Temporibus, ullam excepturi...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*/.container*/}
            </section>
            {/*/.blog*/}
            {/*blog end */}
        </>

    )
}
