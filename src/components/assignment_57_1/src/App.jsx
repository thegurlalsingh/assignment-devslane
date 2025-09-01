import './App.css'
import React, { useState } from 'react'

function AppThree() {
  const [sortOption, setSortOption] = useState('default')
  const [searchTerm, setSearchTerm] = useState('')

  const originalProducts = [
    {
      title: 'Crockery Set',
      price: 120,
      image: 'https://nestasia.in/cdn/shop/files/fluted-ceramic-small-tea-cup-and-saucer-set-of-6-100ml.jpg?v=1724417198',
    },
    {
      title: 'Tea Cup',
      price: 90,
      image: 'https://nestasia.in/cdn/shop/files/fluted-ceramic-small-tea-cup-and-saucer-set-of-6-100ml.jpg?v=1724417198',
    },
    {
      title: 'Mug Set',
      price: 150,
      image: 'https://nestasia.in/cdn/shop/files/fluted-ceramic-small-tea-cup-and-saucer-set-of-6-100ml.jpg?v=1724417198',
    },
  ]

  const products = [...originalProducts, ...originalProducts, ...originalProducts]

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'title') return a.title.localeCompare(b.title)
    if (sortOption === 'low-to-high') return a.price - b.price
    if (sortOption === 'high-to-low') return b.price - a.price
    return 0
  })

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
        <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-xl border p-2 min-w-[200px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="rounded-xl border p-2 min-w-[200px]"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default Sort</option>
            <option value="title">Sort by title</option>
            <option value="low-to-high">Sort by price: low to high</option>
            <option value="high-to-low">Sort by price: high to low</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-6 justify-evenly">
          {sortedProducts.map((product, index) => (
            <div key={index} className="w-[200px] flex flex-col items-center">
              <img className="rounded-xl mb-3" src={product.image} alt={product.title} />
              <h1 className="text-lg font-semibold">{product.title}</h1>
              <div className="flex items-center my-2">
                {[...Array(4)].map((_, i) => (
                  <img key={i} src="https://codeyogi.io/star.png" alt="star" />
                ))}
                <img src="https://codeyogi.io/grey-star.png" alt="star" />
              </div>
              <p className="text-gray-700 font-semibold">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
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

      <div className="text-center mt-10 text-white">
        <div className="w-full flex justify-between items-center bg-gray-800 px-6 py-4 shadow">
          <h1>Copyright</h1>
        </div>
      </div>
    </div>
  )
}

export default AppThree
