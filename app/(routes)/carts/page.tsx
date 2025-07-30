'use client'

import React, { useContext, useMemo } from "react";
import { CartContext } from "@/context/CartContext";
import { Product } from "@/app/_components/PopularProducts";
import Image from "next/image";

type CartItem = {
  id: number;
  documentId: string;
  products: Product[];
  design: string;
};

const Carts = () => {
  const { cart } = useContext(CartContext);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return cart?.reduce((acc: any, item: { products: { price: number; }[]; }) => {
      const price = item.products[0]?.price || 0;
      return acc + price;
    }, 0) ?? 0;
  }, [cart]);

  return (
    <div
      className="relative w-screen max-w-md border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
        <span className="sr-only">Close cart</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart?.length ? (
            cart.map((cartItem: CartItem, index: number) => (
              <li className="flex items-center gap-4" key={index}>
                <img
                  src={cartItem.products[0]?.productImage?.[0]?.url || "/placeholder.png"}
                  alt="Product"
                  className="size-16 rounded-sm object-cover"
                />
                <img
                  src={cartItem.design || "/placeholder.png"}
                  alt="Product"
                  className="size-16 rounded-sm object-cover"
                />
                <div>
                  <h3 className="text-sm text-gray-900">
                    {cartItem.products[0]?.title || "Product"}
                  </h3>
                  <dl className="mt-0.5 text-[12px] text-gray-600">
                    <div>
                      <dt className="inline">Price: </dt>
                      <dd className="inline font-semibold">₹{cartItem.products[0]?.price ?? 0}</dd>
                    </div>
                  </dl>
                  <div className="mt-2">
                    <Image
                      src={cartItem.design}
                      alt="Design"
                      width={60}
                      height={60}
                      className="rounded shadow-md"
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center">Your cart is empty.</p>
          )}
        </ul>

        {cart?.length > 0 && (
          <>
            <div className="border-t pt-4 text-center">
              <p className="text-md font-semibold text-gray-800">
                Total: ₹{totalPrice}
              </p>
            </div>

            <div className="space-y-4 text-center">
              <a
                href="#"
                className="block rounded-sm border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
              >
                View Full Cart ({cart.length})
              </a>

              <a
                href="#"
                className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Checkout
              </a>

              <a
                href="/products"
                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
              >
                Continue shopping
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Carts;
