"use client";
import React, { useState } from "react";
import type { User } from "@/app/_components/Header";
import { UserDetailContext } from "@/context/UserDetailContext";
import { CartContext } from "@/context/CartContext";

export function UserDetailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userDetail, setUserDetail] = useState<User | undefined>(undefined);
  const [cart, setCart] = useState<any[]>([]);
  //get cart list

  const removeFromCart = (index: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  return (
    // @ts-ignore
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <CartContext.Provider value={{cart, setCart, removeFromCart}}>{children}</CartContext.Provider>
    </UserDetailContext.Provider>
  );
}
