import React from 'react';

const products = [
  {
    id: 1,
    title: 'Product 1',
    image: '/img/products/product_1.jpg',
    description: 'This is a description of product 1.',
    price: '$25.99',
  },
  {
    id: 2,
    title: 'Product 2',
    image: '/img/products/product_2.jpg',
    description: 'This is a description of product 2.',
    price: '$45.99',
  },
  {
    id: 3,
    title: 'Product 3',
    image: '/img/products/product_3.jpg',
    description: 'This is a description of product 3.',
    price: '$15.99',
  },
  {
    id: 4,
    title: 'Product 4',
    image: '/img/products/product_4.jpg',
    description: 'This is a description of product 4.',
    price: '$35.99',
  },
];

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Our Products</h1>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
              <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
