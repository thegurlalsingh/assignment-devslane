import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import AssignmentPage from './AssignmentPage'
import ProductCard from './assignment_58_1/Homepage'
import ProductDetails from './assignment_59_1/ProductDetails'
import CartPage from './assignment_59_1/CartPage' // if you have it
import Homepage from './assignment_59_1/Homepage'

function AppWrapper() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: parseInt(quantity) || 0 }
          : item
      )
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home addToCart={addToCart} cartItems={cartItems} />,
    },
    {
      path: '/:id',
      element: <AssignmentPage addToCart={addToCart} cartItems={cartItems} />,
    },
    {
      path: '/:id/product',
      element: <ProductCard />,
    },
    {
        path: ':id/product/:id',
        element: (
            <ProductDetails />
          ),
      },
      {
        path: ':id/assignment_59_1/cart',
        element: (
          <CartPage
            cart={cartItems}
            setCart={setCartItems}
            updateQuantity={updateQuantity}
          />
        ),
      }
      
  ])

  return <RouterProvider router={router} />
}

export default AppWrapper
