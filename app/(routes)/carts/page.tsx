'use client'

import React, { useContext, useMemo } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/utils";
import { Trash2 } from "lucide-react";

// Updated to match actual data structure
type CartItem = {
  id?: number;
  documentId?: string;
  products?: {
    id: string;
    title: string;
    pricing: number;
    description: string;
    productimage: { url: string }[];
  };
  product?: {
    id: string;
    title: string;
    pricing: number;
    description: string;
    productimage: { url: string }[];
  };
  design: string;
  userEmail?: string;
};

const Carts = () => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);

  const totalPrice = useMemo(() => {
    return cart?.reduce((acc: any, item: CartItem) => {
      const price = (item.product?.pricing || item.products?.pricing) || 0;
      return acc + price;
    }, 0) ?? 0;
  }, [cart]);

  return (
    <div className="relative w-screen max-w-md border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header with Clear All button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
        {cart?.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all items from your cart?')) {
                setCart([]);
              }
            }}
            className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-md transition-colors"
            title="Clear all items"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart?.length ? (
            cart.map((cartItem: CartItem, index: number) => {
              // Handle both data structures
              const product = cartItem.product || cartItem.products;
              const productImageUrl = product?.productimage?.[0]?.url;
              const designUrl = cartItem.design;
              
              // Only show design image if designUrl exists
              const showDesignImage = designUrl && designUrl !== 'undefined';

              return (
                <li className="flex items-center gap-4 relative" key={index}>
                  <img
                    src={getStrapiImageUrl(productImageUrl)}
                    alt="Product"
                    className="size-16 rounded-sm object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  {showDesignImage && (
                    <img
                      src={getStrapiImageUrl(designUrl)}
                      alt="Design"
                      className="size-16 rounded-sm object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-sm text-gray-900">
                      {product?.title || "Product"}
                    </h3>
                    <dl className="mt-0.5 text-[12px] text-gray-600">
                      <div>
                        <dt className="inline">Price: </dt>
                        <dd className="inline font-semibold">
                          ₹{product?.pricing ?? 0}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to remove this item from your cart?')) {
                        removeFromCart(index);
                      }
                    }}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove from cart"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 text-center">Your cart is empty.</p>
          )}
        </ul>
        
        {/* Total and Checkout */}
        {cart?.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-lg font-bold text-green-600">₹{totalPrice}</span>
            </div>
            <button
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
              onClick={() => alert('Checkout functionality coming soon!')}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carts;