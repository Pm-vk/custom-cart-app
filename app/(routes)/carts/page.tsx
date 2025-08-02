'use client'

import React, { useContext, useMemo } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/utils";

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
  const { cart } = useContext(CartContext);

  const totalPrice = useMemo(() => {
    return cart?.reduce((acc: any, item: CartItem) => {
      const price = (item.product?.pricing || item.products?.pricing) || 0;
      return acc + price;
    }, 0) ?? 0;
  }, [cart]);

  return (
    <div className="relative w-screen max-w-md border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      {/* ... other code ... */}
      
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
                  <li className="flex items-center gap-4" key={index}>
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
                  <div>
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
                </li>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 text-center">Your cart is empty.</p>
          )}
        </ul>
        
        {/* ... rest of the code ... */}
      </div>
    </div>
  );
};

export default Carts;