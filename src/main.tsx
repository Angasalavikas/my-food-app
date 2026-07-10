import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { CartProvider } from './ContextApi/CartProvider'
import { OrderProvider } from './ContextApi/OrderProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OrderProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </OrderProvider>
  </StrictMode>,
);
