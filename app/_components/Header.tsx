"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

const menu = [
  { id: 4, name: "ContactUs", path: "/contact" },
];

export type User = {
  email: string;
  name: string;
  picture: string;
};

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const { setUserDetail } = useContext(UserDetailContext);
  const { cart, setCart } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    await axios.post("/api/users", {
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  };

  useEffect(() => {
    user && GetCartList();
  }, [user]);

  const GetCartList = async () => {
    const result = await axios.get("/api/cart?email=" + user?.email);
    setCart(result.data);
  };

  return (
    <header className="w-full shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {menu.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link href="/carts" className="relative">
            <ShoppingCart className="text-gray-700" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1.5 rounded-full">
              {cart?.length ?? 0}
            </span>
          </Link>
          {!user ? (
            <Button size="sm" onClick={() => googleLogin()}>
              Sign In / Sign Up
            </Button>
          ) : (
            <Button
              size="icon"
              className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              {user.name?.charAt(0).toUpperCase()}
            </Button>
          )}
          {/* Mobile menu icon */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3">
            {menu.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="block text-gray-700 hover:text-blue-600 font-medium transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
