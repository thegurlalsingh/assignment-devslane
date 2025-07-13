import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import assignments from '../info' // make sure this path is correct

function Homepage({ addToCart }) {
  const { id } = useParams()
  const assignment = assignments.find((a) => a.id === id)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('default')

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
        setLoading(false)
      })
  }, [])

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
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-white px-6 py-4 shadow mb-6">
        <img
          className="w-[125px] h-auto"
          src="https://www.seventhsensetalent.com/s/store/courses/5f9104c70cf2c079ec13b996/cover.jpg?v=1"
          alt="Logo"
        />
        <Link to="assignment_59_1/cart" className="text-blue-600 font-semibold hover:underline">
          See Cart
        </Link>
      </div>

      {/* Filter Section */}
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

        {/* Products */}
        {loading ? (
          <div className="text-center py-10 text-lg">Loading products...</div>
        ) : (
          <div className="flex flex-wrap flex-row gap-6 justify-evenly">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="w-[200px] bg-white rounded-lg shadow p-4 flex flex-col items-center"
              >
                <img
                  className="rounded-xl mb-3 w-[100px] h-[100px] object-contain"
                  src={product.image}
                  alt={product.title}
                />
                <h1 className="text-sm font-semibold text-center line-clamp-2 h-[40px]">
                  {product.title}
                </h1>
                <p className="text-gray-700 font-semibold mt-2">
                  ${product.price.toFixed(2)}
                </p>

                {/* Buttons */}
                <Link
                  to={`/${assignment.id}/product/${product.id}`}
                  className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm text-center w-full"
                >
                  View Product Page
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm w-full"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Homepage
