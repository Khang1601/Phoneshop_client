import { apis } from "@/service/apis"
import { StoreType } from "@/store"
import { Card, message } from "antd"
import Meta from "antd/es/card/Meta"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import '../products/products.scss'

export default function Brand() {
    const userStore = useSelector((store: StoreType) => store.userStore)
    const { id } = useParams()
    const [brandProductsList, setBrandProductsList] = useState([])
    const [brandDetail, setBrandDetail] = useState()

    useEffect(() => {
        getBrandProducts()
        getBrandDetail()
    }, [])

    const getBrandDetail = async () => {
        try {
            const result = await apis.productCliApi.getBrandDetail(Number(id))
            if (result.status == 200) {
                setBrandDetail(result.data.data[0])
            } else {
                message.error("Lấy dữ liệu thất bại")
            }
        } catch (error) {
            message.error("Lấy dữ liệu thất bại")
        }
    }
    const getBrandProducts = async () => {
        try {
            const result = await apis.productCliApi.getProductByBrand(Number(id))
            if (result.status == 200) {
                console.log(result.data.data);

                setBrandProductsList(result.data.data)
            } else {
                message.error("Lấy dữ liệu thất bại")
            }
        } catch (error) {
            message.error("Lấy dữ liệu thất bại")
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
        <div className='page-container'>

            {/* <div style={{ width: '100%', height: '150px' }} className="brandTitle" onClick={() => {
                console.log(brandDetail);
            }}>
                <img style={{ width: '100%', height: '120px', objectFit: 'contain' }} src={(brandDetail as any)?.brandLogo} alt="" />
            </div> */}



            <div style={{ display: 'flex', justifyContent: 'center' }} className="productsDisplay-container">


            {/* <h3 className='banner_title_product' >Sản phẩm điện thoại</h3> */}

            <div className="render_page_productlist container-fluid bg-trasparent my-4 p-3"

                style={{ position: "relative" }}
            >

                <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3" ></div>


                {brandProductsList.length != 0 ? brandProductsList.map(item => (


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

                            {
                                (item as any).bestSeller && <div className="label-mid shadow-sm" >

                                    <a
                                        className="text-white2"
                                        target="_blank"
                                        href="#"
                                    >
                                        Best Seller
                                    </a>
                                </div>
                            }


                            <div className="card-body">
                                <div className="clearfix mb-3">
                                    <span className="float-start badge rounded-pill bg-success">
                                        {/* {MeoMeoJs.convertToVND(product.price)} */}
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



                )) : <img style={{ width: '100%', height: '200px' }} src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" />}

            </div>

            </div>

        </div >
    )
}
