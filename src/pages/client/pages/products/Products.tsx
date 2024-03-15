import { Button, Card, Flex, Input, Pagination, PaginationProps, Select, message } from 'antd'
import './products.scss'
import { useEffect, useState } from 'react'
import { apis } from '@/service/apis'
import { StoreType } from '@/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const { Meta } = Card;


//---



export default function Products() {
    const { brand } = useParams()
    const [renderProductList, setRenderProductList] = useState<Array<any>>([])
    const [categoriesList, setCategoriesList] = useState<Array<any>>([])
    const [materialList, setMaterialList] = useState<Array<any>>([])
    const [madeByList, setMadeByList] = useState<Array<any>>([])
    const [brandsList, setBrandsList] = useState<Array<any>>([])

    const [categoriesOption, setCategoriesOption] = useState<Array<{ value: number | null, label: string }>>([])
    const [materialOption, setMaterialOption] = useState<Array<{ value: number | null, label: string }>>([])
    const [brandsOption, setBrandsOption] = useState<Array<{ value: number | null, label: string }>>([])
    const [madeByOption, setMadeByOption] = useState<Array<{ value: number | null, label: string }>>([])

    const userStore = useSelector((store: StoreType) => store.userStore)

    const [resultCount, setResultCount] = useState<number>(0)
    const pageSize = 8

    const [current, setCurrent] = useState(1);

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    useEffect(() => {
        if (brand) {
            setSearchBrand(Number(brand))
        }
        getPageProductList()
        getSearchSelector(null)
    }, [current])

    const getSearchSelector = async (type: number | null) => {
        try {
            let material;
            let categories;
            let madeBy;
            let brands;
            switch (type) {
                case null:
                    material = await apis.adminProductsApiModule.getProductMaterial()
                    categories = await apis.adminProductsApiModule.getProductCategories()
                    madeBy = await apis.adminProductsApiModule.getProductmadeBy()
                    brands = await apis.adminProductsApiModule.getProductBrand()
                    break;
                case 1:
                    material = await apis.adminProductsApiModule.getProductMaterial()
                    break;
                case 2:
                    categories = await apis.adminProductsApiModule.getProductCategories()
                    break;
                case 3:
                    madeBy = await apis.adminProductsApiModule.getProductmadeBy()
                    break;
                case 4:
                    brands = await apis.adminProductsApiModule.getProductBrand()
                    break;
                default:
                    break;
            }

            setBrandsList(brands?.data.data || [])
            setCategoriesList(categories?.data.data || [])
            setMadeByList(madeBy?.data.data || [])
            setMaterialList(material?.data.data || [])
        } catch (err) {
            console.log(err);

            message.error('lấy dữ liệu thất bại')
        }
    }

    const getPageProductList = async () => {
        try {
            const searchOption = {
                productName: searchName,
                material: searchMaterial,
                madeBy: searchMadeBy,
                category: searchCategory,
                brand: searchBrand,
                currentPage: current,
                pageSize
            }

            const result = await apis.productCliApi.getProductsByOption(searchOption)

            setResultCount(result.data.count)
            setRenderProductList(result.data.data)
        } catch (error) {
            console.log("error", error);

        }
    }

    const clearSearch = () => {
        setSearchName("");
        setSearchMaterial(null);
        setSearchMadeBy(null);
        setSearchCategory(null)
        setSearchBrand(null)
    }
    useEffect(() => {
        let cateOption = categoriesList.map(item => {
            return { value: item.id, label: item.categoryName }
        });
        setCategoriesOption(cateOption);

        let mateOption = materialList.map(item => {
            return { value: item.id, label: item.material }
        });
        setMaterialOption(mateOption);

        let brandOption = brandsList.map(item => {
            return { value: item.id, label: item.brandName }
        });
        setBrandsOption(brandOption)

        let countryOption = madeByList.map(item => {
            return { value: item.id, label: item.country }
        });
        setMadeByOption(countryOption)

    }, [categoriesList, madeByList, materialList, brandsList])

    const boxStyle: React.CSSProperties = {
        width: '100%',
        height: 50,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 6,
        border: '1px solid #40a9ff',
        backgroundColor: '#FFFFFF'
    };
    const [searchName, setSearchName] = useState<string>("")
    const [searchMaterial, setSearchMaterial] = useState<number | null>(null)
    const handleMaterialSelector = (value: number | null) => {
        setSearchMaterial(value)
    }

    const [searchMadeBy, setSearchMadeBy] = useState<number | null>(null)
    const handleMadeBySelector = (value: number | null) => {
        setSearchMadeBy(value)
    };

    const [searchCategory, setSearchCategory] = useState<number | null>(null)
    const handleCategoryChange = (value: number | null) => {
        setSearchCategory(value)
    };

    const [searchBrand, setSearchBrand] = useState<number | null>(null)
    const handleBrandChange = (value: number | null) => {
        setSearchBrand(value)
    };

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
        // <div className='page-container'>
        <div className='page-container'>




            {/* <div className='searchBar-container'>
                <Flex gap="middle" align="start" vertical>
                    <Flex style={boxStyle} justify={'space-evenly'} align={'center'}>
                        <span style={{ fontSize: "14px" }}>Kết quả : {resultCount} sản phẩm</span>
                        <Input style={{ width: 120 }} value={searchName} size="small" type="text" placeholder="Tên sản phẩm" onChange={(e) => { setSearchName(e.target.value) }} />
                        <Select
                            value={searchMaterial}
                            style={{ width: 140, height: 25 }}
                            onChange={handleMaterialSelector}
                            size="small"
                            options={[{ value: null, label: "Chọn chất liệu" }, ...materialOption]}
                        />
                        <Select
                            value={searchMadeBy}
                            style={{ width: 140, height: 25 }}
                            onChange={handleMadeBySelector}
                            size="small"
                            options={[{ value: null, label: "Chọn xuất xứ" }, ...madeByOption]}
                        />
                        <Select
                            value={searchBrand}
                            style={{ width: 140, height: 25 }}
                            onChange={handleBrandChange}
                            size="small"
                            options={[{ value: null, label: "Chọn nhãn hiệu" }, ...brandsOption]}
                        />
                        <Select
                            value={searchCategory}
                            style={{ width: 140, height: 25 }}
                            onChange={handleCategoryChange}
                            size="small"
                            options={[{ value: null, label: "Chọn thể loại" }, ...categoriesOption]}
                        />
                        <Button danger size={"small"} onClick={() => { getPageProductList() }}>
                            Tìm kiếm
                        </Button>
                        <Button type="default" size={"small"} onClick={() => { clearSearch() }}>
                            Làm mới
                        </Button>
                    </Flex>
                </Flex>
            </div> */}

            {/* <div className='productsDisplay-container'> */}


            <h3 className='banner_title_product' >Sản phẩm điện thoại</h3>

            <div className="render_page_productlist container-fluid bg-trasparent my-4 p-3"

                style={{ position: "relative" }}
            >
                <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3" >
                    
                    {renderProductList?.map(item => (

                        // <div key={Math.random() * Date.now()}>






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
                                                addToCart(item.id)

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
                        // </div>
                    ))}

                    {/* </div> */}
                </div>

            </div>

            {/* <Pagination pageSize={pageSize} defaultCurrent={current} total={resultCount} onChange={onChange} /> */}
        </div>
    )
}
