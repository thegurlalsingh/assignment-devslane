import React from 'react';

function ProductCard() {
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen p-4">
      <div className="max-w-4xl w-full bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="flex flex-col flex-1 items-center">
          <img
            src="https://codeyogi.io/coffee-mug.jpeg"
            alt="Black printed coffee mug"
            className="w-30 h-auto rounded shadow mb-3"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Black printed coffee mug</h2>
          <p className="text-lg font-semibold text-gray-800 mb-1">$140</p>
          <p className="text-gray-600 mb-4">
            The Black printed coffee mug is the perfect. You can hand carry it.
          </p>

          <input
            type="text"
            placeholder="Enter quantity"
            className="rounded px-5 py-2 border border-gray-300 mb-3"
          />

          <br />

          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
