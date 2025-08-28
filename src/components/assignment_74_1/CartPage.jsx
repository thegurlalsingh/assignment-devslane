import React from 'react';

const CartPagePrivate = ({ cart, setCart }) => {
  const handleQuantityChange = (id, value) => {
    const updated = cart.map((product) =>
      product.id === id
        ? { ...product, quantity: parseInt(value) || 0 }
        : product
    );
    setCart(updated);
  };

  const cartSubtotal = cart.reduce(
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

            {cart.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                Your cart is empty.
              </div>
            ) : (
              cart.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-4 items-center text-center border-b px-4 py-3 gap-2"
                >
                  <div className="flex items-center gap-4 justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-14 h-14 rounded shadow"
                    />
                    <span>{product.title}</span>
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
                  <div>${(product.price * product.quantity).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
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
                Total: ${cartSubtotal.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Totals Summary */}
        {cart.length > 0 && (
          <div className="w-full lg:w-1/3 mt-[20px] ml-auto pr-[0px] lg:pr-[50px]">
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
        )}
      </div>
    </div>
  );
};

export default CartPagePrivate;
