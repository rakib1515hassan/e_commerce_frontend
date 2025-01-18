"use client"; // Ensure this is at the top for client-side rendering

import React, { useEffect, useState } from "react";

const ProductDetails = ({ params }) => {
  const [product, setProduct] = useState(null);
  const { id } = params; // Extract `id` from params

  useEffect(() => {
    if (!id) return; // If there's no `id`, return early

    const fetchProduct = async () => {
      try {
        const response = await fetch("/data/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const products = await response.json();
        const productData = products.find(
          (product) => product.id === parseInt(id)
        );

        if (!productData) {
          console.error("Product not found");
        } else {
          setProduct(productData); // Set the product data to state
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]); // Fetch product when `id` changes

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Title Section */}
      <h1 className="text-3xl font-semibold text-center mb-6">{product.title}</h1>

      <div className="flex flex-col lg:flex-row items-center">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-72 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Information Section */}
        <div className="lg:ml-8 mt-4 lg:mt-0 w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>

          {/* Product Price */}
          <div className="mt-4">
            <span className="text-lg font-bold text-gray-900">{product.price}</span>
          </div>

          {/* Additional Product Information */}
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-700"><strong>Category:</strong> {product.category}</p>
            <p className="text-sm text-gray-700"><strong>Rating:</strong> {product.rating} / 5</p>
            <p className="text-sm text-gray-700"><strong>Brand:</strong> {product.brand}</p>
            <p className="text-sm text-gray-700"><strong>Availability:</strong> {product.availability}</p>
            <p className="text-sm text-gray-700"><strong>Color:</strong> {product.color}</p>
            <p className="text-sm text-gray-700"><strong>Weight:</strong> {product.weight}</p>
          </div>

          {/* Add to Cart Button */}
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors mt-6 w-full lg:w-auto">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Gallery Section (Optional) */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Gallery</h3>
        <div className="flex overflow-x-auto space-x-4">
          {/* Add more images for the product gallery if needed */}
          <img src={product.image} alt={product.title} className="h-32 object-cover rounded-lg shadow-md" />
          <img src={product.image} alt={product.title} className="h-32 object-cover rounded-lg shadow-md" />
          <img src={product.image} alt={product.title} className="h-32 object-cover rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
