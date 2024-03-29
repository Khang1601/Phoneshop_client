import { useEffect, useState } from 'react'
import { apis } from '@/service/apis'
import { useNavigate } from 'react-router-dom'

export default function BrandChoice() {
    //get Api
    useEffect(() => {
        getBrandList()
    }, [])

    const [brandList, setBrandList] = useState([])

    const getBrandList = async () => {
        try {
            const result = await apis.adminProductsApiModule.getProductBrand()
            if (result.status == 200) {
                setBrandList(result.data.data)
            }
        } catch (error) {

        }
    }

    const navigate = useNavigate()
    return (
        <section className='banner_container'>
            <h3 className='banner_title'>Điện thoại chính hãng</h3>
            
            <div className='brandChoices_showList'>
                {brandList.map(brand => (
                    <div key={Math.random() * Date.now()} className='brandChoices_button' onClick={() => { navigate(`brands/${(brand as any).id}`) }}>
                        <div className='brandChoices_filter'>
                            <img className='brandChoices_logo' src={(brand as any).brandLogo} alt="" />
                           
                        </div>
                    </div>
                ))}
                

            </div>
        </section>
    )
}
