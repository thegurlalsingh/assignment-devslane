import './App.css'
import React from 'react'

function AppTwo() {
  return (
    <div className="min-h-screen bg-gray-300">
      <div className="w-full flex justify-between items-center bg-white px-6 py-4 shadow mb-6">
        <img
          className="w-[125px] h-auto"
          src="https://www.seventhsensetalent.com/s/store/courses/5f9104c70cf2c079ec13b996/cover.jpg?v=1"
          alt="Logo"
        />
      </div>

      <div className="bg-white rounded-xl p-[30px] shadow">
        <div className="flex justify-end mb-4">
          <input type="text" placeholder='enter' className='rounded-xl border p-2' />
        </div>

        <div className="flex flex-wrap gap-6 justify-evenly">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-[200px] flex flex-col items-center">
              <img
                className="rounded-xl mb-3"
                src="https://nestasia.in/cdn/shop/files/fluted-ceramic-small-tea-cup-and-saucer-set-of-6-100ml.jpg?v=1724417198"
                alt=""
              />
              <h1 className="text-lg font-semibold">Crockery Set</h1>
              <div className="flex items-center my-2">
                {[...Array(4)].map((_, i) => (
                  <img key={i} src="https://codeyogi.io/star.png" alt="star" />
                ))}
                <img src="https://codeyogi.io/grey-star.png" alt="star" />
              </div>
              <p className="text-gray-700 font-semibold">$120.00</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 justify-evenly">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-[200px] flex flex-col items-center">
              <img
                className="rounded-xl mb-3"
                src="https://nestasia.in/cdn/shop/files/fluted-ceramic-small-tea-cup-and-saucer-set-of-6-100ml.jpg?v=1724417198"
                alt=""
              />
              <h1 className="text-lg font-semibold">Crockery Set</h1>
              <div className="flex items-center my-2">
                {[...Array(4)].map((_, i) => (
                  <img key={i} src="https://codeyogi.io/star.png" alt="star" />
                ))}
                <img src="https://codeyogi.io/grey-star.png" alt="star" />
              </div>
              <p className="text-gray-700 font-semibold">$120.00</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 justify-evenly">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-[200px] flex flex-col items-center">
              <img
                className="rounded-xl mb-3"
                src="https://nestasia.in/cdn/shop/files/fluted-ceramic-small-tea-cup-and-saucer-set-of-6-100ml.jpg?v=1724417198"
                alt=""
              />
              <h1 className="text-lg font-semibold">Crockery Set</h1>
              <div className="flex items-center my-2">
                {[...Array(4)].map((_, i) => (
                  <img key={i} src="https://codeyogi.io/star.png" alt="star" />
                ))}
                <img src="https://codeyogi.io/grey-star.png" alt="star" />
              </div>
              <p className="text-gray-700 font-semibold">$120.00</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-10">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className="px-4 py-2 bg-white border border-red-700 text-red-700 rounded"
            >
              {page}
            </button>
          ))}
        </div>

      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-white">
      <div className="w-full flex justify-between items-center bg-gray-800 px-6 py-4 shadow">
        <h1>Copyright</h1>
      </div>
      </div>
    </div>
  )
}

export default AppTwo
