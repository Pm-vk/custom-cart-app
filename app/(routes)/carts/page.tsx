'use client'

import React, { useContext, useMemo } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

// Updated to match types/index.d.ts
type CartItem = {
  id: number;
  documentId: string;
  product: {
    id: string;
    title: string;
    pricing: number;
    description: string;
    productimage: { url: string }[];
  };
  design: string;
};

const Carts = () => {
  const { cart } = useContext(CartContext);

  const totalPrice = useMemo(() => {
    return cart?.reduce((acc: any, item: { product: { pricing: number; }; }) => {
      const price = item.product?.pricing || 0;
      return acc + price;
    }, 0) ?? 0;
  }, [cart]);

  return (
    <div className="relative w-screen max-w-md border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      {/* ... other code ... */}
      
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart?.length ? (
            cart.map((cartItem: CartItem, index: number) => (
              <li className="flex items-center gap-4" key={index}>
                <img
                  src={cartItem.product?.productimage?.[0]?.url || "/placeholder.png"}
                  alt="Product"
                  className="size-16 rounded-sm object-cover"
                />
                <img
                  src={cartItem.design || "/placeholder.png"}
                  alt="Design"
                  className="size-16 rounded-sm object-cover"
                />
                <div>
                  <h3 className="text-sm text-gray-900">
                    {cartItem.product?.title || "Product"}
                  </h3>
                  <dl className="mt-0.5 text-[12px] text-gray-600">
                    <div>
                      <dt className="inline">Price: </dt>
                      <dd className="inline font-semibold">
                        ₹{cartItem.product?.pricing ?? 0}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))
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