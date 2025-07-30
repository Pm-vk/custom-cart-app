'use client'
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Category = {
  name: string;
  icon: {
    url: string;
  };
  documentId: string;
  id: number,
  slug:string
};

function Categories() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    try {
      const result = await axios.get("/api/categories");
      console.log(result.data);
      setCategoryList(result?.data?.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  return (
    <div className="px-6 py-10 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {categoryList?.map((category: Category) => (
          <Link
            href={'/category/'+category?.slug}
            key={category.id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 hover:scale-105 active:scale-110"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden group-hover:bg-gray-200 transition-all duration-300">
              <Image
                src={category.icon?.url}
                alt={category.name}
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
