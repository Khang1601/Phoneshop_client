import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

import { ConfigProvider, Button } from 'antd'
import fr_FR from 'antd/locale/fr_FR';
import en_US from 'antd/locale/en_US';

ReactDOM.createRoot(document.getElementById('root')!).render(


<ConfigProvider locale={en_US}>

    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

</ConfigProvider>

)
