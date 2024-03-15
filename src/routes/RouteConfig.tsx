import { Route, Routes } from 'react-router-dom'
import { lazyFn } from '@/utils/lazy'


export default function MainRoutes() {
  return (
        <Routes>
            <Route path='/' element={lazyFn(() => import('@pages/client/MainPage'))}>
                <Route path='' element={lazyFn(() => import('@pages/client/pages/home/Home'))}></Route>
                <Route path='products' element={lazyFn(() => import('@pages/client/pages/products/Products'))}></Route>
                <Route path='brands/:id' element={lazyFn(() => import('@pages/client/pages/brands/Brand'))}></Route>

                <Route path='/offer' element={lazyFn(() => import('@pages/client/components/offer/Offer'))}></Route>
                <Route path='/contact' element={lazyFn(() => import('@pages/client/pages/contact/Contact'))}></Route>
                <Route path='/blog' element={lazyFn(() => import('@pages/client/pages/blog/Blog'))}></Route>


            </Route>

            <Route path='/auth' element={lazyFn(() => import('@pages/client/auth/AuthenPage'))}></Route>
            {/* <Route path='/authen' element={lazyFn(() => import('@pages/client/authen/Authen'))}></Route> */}


            <Route path='/admin-auth' element={lazyFn(() => import('@pages/admin/auth-page/auth/AdminAuth'))}></Route>
            <Route path='/admin' element={lazyFn(()=>import('@pages/admin/AdminMainPage'))}>
              <Route path='home' element={lazyFn(() => import('@pages/admin/fn-page/home/AdminHome'))}/>
              <Route path='products' element={lazyFn(() => import('@pages/admin/fn-page/products/AdminProductMng'))}/>

              <Route path='accounts' element={lazyFn(() => import('@pages/admin/fn-page/accounts/AdminAccMng'))}/>
              <Route path='receipts' element={lazyFn(() => import('@pages/admin/fn-page/receipts/AdminReceiptMng'))}/>
              
            </Route>
          
        </Routes>
  )
}
