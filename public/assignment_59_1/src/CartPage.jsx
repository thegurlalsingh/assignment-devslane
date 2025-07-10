import React, { useState } from 'react';

const initialProducts = [
  {
    id: 1,
    name: 'Black Printed Coffee Cup',
    image: 'https://codeyogi.io/coffee-mug.jpeg',
    price: 51,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Minimal Mug',
    image: 'https://codeyogi.io/coffee-mug.jpeg',
    price: 35,
    quantity: 2,
  },
  {
    id: 3,
    name: 'White Mug with Logo',
    image: 'https://codeyogi.io/coffee-mug.jpeg',
    price: 42,
    quantity: 1,
  },
];

const CartPage = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleQuantityChange = (id, value) => {
    const updated = products.map((product) =>
      product.id === id
        ? { ...product, quantity: parseInt(value) || 0 }
        : product
    );
    setProducts(updated);
  };

  const cartSubtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Cart Page</h1>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        <div className="flex-1">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gray-200 grid grid-cols-4 text-center font-semibold py-3 border-b">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>

            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-4 items-center text-center border-b px-4 py-3 gap-2"
              >
                <div className="flex items-center gap-4 justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded shadow"
                  />
                  <span>{product.name}</span>
                </div>
                <div>${product.price}</div>
                <div>
                  <input
                    type="number"
                    min="0"
                    className="w-20 px-2 py-1 border rounded text-center"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                  />
                </div>
                <div>${(product.price * product.quantity)}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center px-4 py-4 bg-white mt-4 rounded shadow">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Coupon code"
                className="border px-3 py-1 rounded"
              />
              <button className="bg-blue-600 text-white px-4 py-1 rounded">
                Apply
              </button>
              <button className="bg-gray-500 text-white px-4 py-1 rounded">
                Update Cart
              </button>
            </div>
            <div className="text-xl font-semibold">
              Total: ${cartSubtotal}
            </div>
          </div>
        </div>

        
      </div>
      <div className="w-1/3 mt-[20px] ml-auto pr-[50px]">
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Cart Totals</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between mb-4 font-bold text-lg">
              <span>Total</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <button className="bg-green-600 w-full text-white py-2 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
    </div>
  );
};

export default CartPage;
