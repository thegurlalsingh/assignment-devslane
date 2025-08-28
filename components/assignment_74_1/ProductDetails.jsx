import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetailsPrivate() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Optional: Check if API returned empty object
        if (!data || Object.keys(data).length === 0) {
          throw new Error('No product found with this ID')
        }

        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    )
  }

  if (!product || product.id === undefined) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 font-semibold text-xl">
        Product not found.
      </div>
    )
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen p-4">
      <div className="max-w-4xl w-full bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col flex-1 items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-40 h-auto rounded shadow mb-3"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-lg font-semibold text-gray-800 mb-1">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>

          
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPrivate
