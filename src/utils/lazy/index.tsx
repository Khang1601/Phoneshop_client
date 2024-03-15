import { Alert, Spin } from "antd";
import { lazy, Suspense } from "react";

export const lazyFn = (importFunc: any, access: boolean = true) => {

  if (!access) {
    return <>Không có quyền truy cập</>
  }

  const LazyComponent = lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(importFunc());
      }, 1000);
    });
  });

  return <Suspense fallback={
    // <Spin size="large" style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}/>


    <Spin tip="Loading...hãy đợi 1 chút..." style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}        >
      <Alert
        message=""
        description=""
        type="info"
      />
    </Spin>

  }>



    <LazyComponent />
  </Suspense>;
};    