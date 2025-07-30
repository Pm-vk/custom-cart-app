import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Categories from "./_components/Categories";
import PopularProducts from "./_components/PopularProducts";

export default function Home() {
  return (
    <div>
      {/* headeer */}

      {/* Hero */}
      <Hero />

      {/* Cateorgy */}
      <Categories />

      {/* product list */}
      <PopularProducts />

      {/* footer */}
    </div>
  );
}
