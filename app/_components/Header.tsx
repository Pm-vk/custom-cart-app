"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

const menu = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Products", path: "/products" },
  { id: 3, name: "AboutUs", path: "/about" },
  { id: 4, name: "ContactUs", path: "/contact" },
];

export type User = {
  email: string;
  name: string;
  picture: string;
};

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenResponse = JSON.parse(
        localStorage.getItem("tokenResponse") || "null"
      );
      if (tokenResponse) {
        GetUserProfile(tokenResponse.access_token);
      }
    }
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      localStorage.setItem("tokenResponse", JSON.stringify(tokenResponse));

      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      setUser(userInfo.data);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const GetUserProfile = async (access_token: string) => {
    try {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      setUser(userInfo.data);
      setUserDetail(userInfo?.data);
      SaveNewUser(userInfo?.data);
    } catch (e) {
      localStorage.setItem("tokenResponse", "");
    }
  };

  const SaveNewUser = async (user: User) => {
    const result = await axios.post("/api/users", {
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
    console.log(result.data);
  };

  useEffect(() => {
    if (user) {
      GetCartList();
    }
  }, [user]);

  const GetCartList = async () => {
    const result = await axios.get("/api/cart?email=" + user?.email);
    setCart(result.data);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <Image src="/logo.svg" alt="Logo" width={180} height={100} priority />
      <ul className="flex gap-5">
        {menu.map((item) => (
          <li
            key={item.id}
            className="text-lg cursor-pointer hover:text-blue-500 transition"
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="flex gap-3 items-center">
        <Link href="/carts" className="flex gap-2 items-center">
          <ShoppingCart />
          <span className="p-1 bg-gray-100 px-2 rounded-xl">
            {cart?.length ?? 0}
          </span>
        </Link>
        {!user ? (
          <Button onClick={() => googleLogin()}>Sign In / Sign Up</Button>
        ) : (
          <Button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg">
            {user.name?.charAt(0).toUpperCase()}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
