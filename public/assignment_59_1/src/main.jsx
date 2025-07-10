import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx' 
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './Homepage.jsx'
import ProductCard from './ProductDetails.jsx'
import CartPage from './CartPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/product',
    element: <ProductCard />
  },
  {
    path: '/cart',
    element: <CartPage />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
