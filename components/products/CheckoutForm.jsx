"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { postData } from '@/lib/axios';
import { toast } from 'react-toastify';

const CheckoutForm = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Step 1: Request a PaymentIntent from the backend
            // const response = await fetch("http://127.0.0.1:8000/api/v1/payments/create-payment-intent/", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ amount: totalAmount }), // Pass total amount
            // });
            // const { clientSecret } = await response.json();

            const response = await postData("/payments/create-payment-intent/", {
                amount: totalAmount,
            });
            const { clientSecret } = response;

            if (!clientSecret) {
                throw new Error("Failed to get client secret");
            }

            // Step 2: Confirm payment with Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === "succeeded") {
                console.log("Payment succeeded:", paymentIntent);
                toast.success('Payment successful!');
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error('An error occurred while processing your payment.');
            setError("Error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <CardElement options={{ hidePostalCode: true }} />
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">Total: ${totalAmount.toFixed(2)}</span>
                <button
                    type="submit"
                    disabled={isProcessing}
                    className={`bg-blue-600 text-white py-2 px-6 rounded-md ${isProcessing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                        }`}
                >
                    {isProcessing ? "Processing..." : "Pay Now"}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
