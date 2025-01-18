"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/data/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Our Products</h1>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {product.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
