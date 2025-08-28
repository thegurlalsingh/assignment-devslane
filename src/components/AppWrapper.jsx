import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import AssignmentPage from './AssignmentPage'
import ProductCard from './assignment_58_1/Homepage'
import ProductDetails from './assignment_59_1/ProductDetails'
import CartPage from './assignment_59_1/CartPage'
import CartPagePrivate from './assignment_74_1/CartPage'
import SignupForm from './assignment_68_1/signup'
import ForgotPasswordForm from './assignment_68_1/forgotPassword'
import ProductDetailsPrivate from './assignment_74_1/ProductDetails'
import HomepagePrivate from './assignment_74_1/Homepage'
import PrivateRoute from './assignment_74_1/PrivateRoute'
import SignupFormPrivate from './assignment_74_1/SignupPage'
import assignments from './info.js';




function AppWrapper() {

  const [cartItems, setCartItems] = useState([])


  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: parseInt(quantity) || 0 }
          : item
      )
    )
  }

  const getCurrentUser = () => JSON.parse(localStorage.getItem('users'));

  const addToCartPrivate = (product) => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) {
      alert('Please login to add items to the cart.');
      return;
    }

    const allCarts = JSON.parse(localStorage.getItem('usersCarts')) || {};
    const userCart = allCarts[loggedInUser.email] || [];

    const existing = userCart.find((item) => item.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = userCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...userCart, { ...product, quantity: 1 }];
    }

    allCarts[loggedInUser.email] = updatedCart;
    localStorage.setItem('usersCarts', JSON.stringify(allCarts));
    setCartItems(updatedCart);
  };

  const addToCart = (product, assignmentId) => {
  if (assignmentId === 'assignment_74_1') {
    addToCartPrivate(product);
  } else {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

};



  const updateQuantityPrivate = (id, quantity) => {
    const user = getCurrentUser();
    if (!user) return alert('User not logged in');

    const cartKey = `cart_${user.email}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const updatedCart = existingCart.map(item =>
      item.id === id
        ? { ...item, quantity: parseInt(quantity) || 0 }
        : item
    );

    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart); // update state if using React state
  };



  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home addToCart={(p) => addToCart(p, 'assignment_59_1')} cartItems={cartItems} />,
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
    },
    {
      path: 'assignment_68_1/signup',
      element: (
        <SignupForm />
      ),
    },
    {
      path: 'assignment_68_1/forgot',
      element: (
        <ForgotPasswordForm />
      ),
    },
    {
      path: 'assignment_74_1/signup',
      element: (
        <SignupFormPrivate />
      ),
    },
    {
      path: 'assignment_74_1/homepage',
      element: (
        <PrivateRoute>
          <HomepagePrivate addToCart={(p) => addToCart(p, 'assignment_74_1')} cartItems={cartItems} />
        </PrivateRoute>
      ),
    },
    {
      path: 'assignment_74_1/product/:id',
      element: (
        <PrivateRoute>
          <ProductDetailsPrivate />
        </PrivateRoute>
      ),
    },
    {
      path: 'assignment_74_1/homepage/assignment_74_1/cart',
      element: (
        <PrivateRoute>
          <CartPagePrivate
            cart={cartItems}
            setCart={setCartItems}
            updateQuantity={updateQuantityPrivate} />
        </PrivateRoute>
      ),
    },
  ])

  return <RouterProvider router={router} />
}

export default AppWrapper
