"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/products/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY); // Your Stripe publishable key

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Mock demo data for testing if the cart is empty
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));

    if (!savedCart || savedCart.length === 0) {
      const demoCartData = [
        {
          id: 1,
          title: "Product 1",
          image: "/img/products/product_1.jpg",
          price: "$25.99",
          quantity: 2,
        },
        {
          id: 2,
          title: "Product 2",
          image: "/img/products/product_2.jpg",
          price: "$45.99",
          quantity: 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(demoCartData));
      setCartItems(demoCartData);
    } else {
      setCartItems(savedCart);
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = parseFloat(item.price.replace("$", "")) * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty. Please add items to proceed.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Cart Summary Section */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-gray-800 font-semibold">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="text-xl font-semibold text-gray-800">Total</span>
            <span className="text-xl font-semibold text-gray-800">${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Information</h2>

          {/* Wrap the CheckoutForm component with Elements provider */}
          <Elements stripe={stripePromise}>
            <CheckoutForm totalAmount={calculateTotal()} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
