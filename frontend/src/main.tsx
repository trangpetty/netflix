import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './fontAwesome'
import 'antd/dist/reset.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./redux/store.ts";
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <StrictMode>
          <BrowserRouter>
                <App />
          </BrowserRouter>
      </StrictMode>
    </Provider>
)
