import { apis } from "@/service/apis";
import { StoreType } from "@/store";
import { Card, message } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const { Meta } = Card;

export default function BestSeller() {
    useEffect(() => {
        getProducts()
    }, [])
    const [bestSellerList, setBestSellerList] = useState([])

    const userStore = useSelector((store: StoreType) => store.userStore)


    const getProducts = async () => {
        try {
            const result = await apis.productCliApi.getBestSeller()
            if (result.status == 200) {
                setBestSellerList(result.data.data)
            }
        } catch (error) {
            setBestSellerList([])
        }
    }

    const addToCart = async (itemId: number) => {
        try {
            if (localStorage.getItem('token')) {
                if (userStore.data) {
                    const result = await apis.productCliApi.addToCart(itemId, userStore.data?.id)
                    if (result.status == 200) {
                        message.success("Thêm sản phẩm thành công")
                    } else {
                        message.error("Thêm sản phẩm thất bại")
                    }
                }
            } else {
                message.error("Quý khách cần đăng nhập trước khi thêm sản phẩm")
                return
            }
        } catch (error) {
            message.error("Lỗi gì đó")
        }
    }
    return (
        // <section className='banner_container bestSeller'>
        //     <h3 className='banner_title'>Điện thoại bán chạy</h3>
        //     <div className="bestSeller-display">
        //         <div className="bestSeller-slideList" id="bestSeller-slideList">


        //             {bestSellerList.map(item => (
        //                 <div key={Math.random() * Date.now()} className="bestSeller_slide">
        //                     <Card
        //                         hoverable
        //                         style={{ width: '270px', objectFit: 'cover' }}
        //                         cover={<img alt="example" src={(item as any).avatar} />}
        //                     >
        //                         <div className="brandLogo-container">
        //                             <img className="brandLogo" src={(item as any).FK_products_brands.brandLogo} alt="" />
        //                         </div>
        //                         <div className="bestSeller-mark">
        //                             <p className="bestSeller-text">Best Seller</p>
        //                         </div>
        //                         <Meta title={(item as any).productName} description={
        //                             <div className="card-description">
        //                                 <p>{`Giá: ${(item as any).price.toLocaleString('vi-VN', {
        //                                     style: 'currency',
        //                                     currency: 'VND',
        //                                 })}`}</p><br />
        //                                 <p>{`Thương hiệu: ${(item as any).FK_products_brands.brandName}`}</p><br />
        //                                 <p>{`Xuất xứ: ${(item as any).FK_products_madeBy.country}`}</p><br />
        //                                 <p>{`Chất liệu: ${(item as any).FK_products_material.material}`}</p><br />
        //                             </div>
        //                         } />
        //                         <button className="addCart-btn" onClick={() => { addToCart((item as any).id) }}>Thêm vào giỏ</button>
        //                     </Card>
        //                 </div>
        //             ))
        //             }


        //         </div>
        //     </div>
        // </section>

        // <div className='page-container'>
        <div className='page-container'>

            <h3 className='banner_title_best_seller'>Điện thoại bán chạy</h3>

            <div className="render_page_productlist container-fluid bg-trasparent my-4 p-3"

                style={{ position: "relative" }}
            >
                <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3" >

                    {bestSellerList.map(item => (


                        <div className="col hp" key={Date.now() * Math.random()}>

                            <div className="card h-100 shadow-sm">
                                <a target="_blank" href="#">
                                    <img
                                        src={(item as any).avatar}
                                        className="card-img-top"
                                        alt="product.title"
                                    />
                                </a>

                                <div className="label-top shadow-sm" >

                                    <a
                                        className="text-white1"
                                        target="_blank"
                                        href="#"
                                    >
                                        {(item as any).FK_products_brands.brandName}
                                    </a>



                                </div>
                                
    <div className="label-mid shadow-sm" >

    <a
        className="text-white2"
        target="_blank"
        href="#"
    >
        Best Seller
    </a>
    </div> 

                                


                                <div className="card-body">
                                    <div className="clearfix mb-3">
                                        <span className="float-start badge rounded-pill bg-success">
                                           
                                            {(item as any).price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                        <span className="float-end">
                                            <a
                                                href="#"
                                                className="small text-muted text-uppercase aff-link"
                                            >
                                                reviews
                                            </a>
                                        </span>
                                    </div>
                                    <h5 className="card-title">
                                        <a target="_blank" href="#">
                                            Tên sản phẩm: {(item as any).productName}
                                            <br />
                                            {/* Dòng: {product.type}
                            , Màu: {product.color} */}

                                            {`Thương hiệu: ${(item as any).FK_products_brands.brandName}`}
                                            , &nbsp;
                                            {`Xuất xứ: ${(item as any).FK_products_madeBy.country}`}
                                            , &nbsp;
                                            {`Chất liệu: ${(item as any).FK_products_material.material}`}

                                        </a>

                                    </h5>
                                    <div className="d-grid gap-2 my-4">
                                        {/* <button  href="#" className="btn btn-warning bold-btn" */}
                                        <button className="btn btn-warning bold-btn"

                                            onClick={async () => {
                                                // dispatch(userAction.addToCart(product))

                                                // handleAddToCart(product.id)
                                                // addToCart(item.id)

                                                addToCart((item as any).id)

                                                // message.success('Thêm vào giỏ hàng thành công!');

                                            }}
                                        >
                                            add to cart
                                        </button>
                                    </div>
                                    <div className="clearfix mb-1">
                                        <span className="float-start">
                                            <a href="#">
                                                <i className="fas fa-question-circle" />
                                            </a>
                                        </span>
                                        <span className="float-end">
                                            <i className="far fa-heart" style={{ cursor: "pointer" }} />
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                    }

                </div>

            </div>


        </div>
    )
}
