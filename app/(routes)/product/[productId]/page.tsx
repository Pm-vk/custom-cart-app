"use client";

import PopularProducts, { Product } from "@/app/_components/PopularProducts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Palette } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ProductCustomizeStudio from "../_components/ProductCustomizeStudio";
import { CartContext } from "@/context/CartContext";
import { UserDetailContext } from "@/context/UserDetailContext";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [enableCustomizeStudio, setEnableCustomizeStudio] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const { userDetail } = useContext(UserDetailContext);
  const [designUrl, setDesignurl] = useState<string>();

  useEffect(() => {
    if (productId) GetProductById();
  }, [productId]);

  const GetProductById = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/api/products?productId=" + productId);
      setProduct(result.data);
    } finally {
      setLoading(false);
    }
  };

  const AddToCart = async() => {
    console.log("Design URL added:", designUrl);
    setCart((prev: any) => [
      ...(Array.isArray(prev) ? prev : []),
      {
        design: designUrl,
        products: product,
        userEmail: userDetail?.email,
      },
    ]);
    const result=await axios.post('/api/cart',{
      product:product,
      designUrl:designUrl,
      userEmail:userDetail?.email

    })
    console.log(result.data);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 my-12">
        {/* Left: Image or Customize Studio */}
        <div className="flex items-center justify-center border rounded-2xl p-4 bg-white w-full">
          {loading ? (
            <Skeleton className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-xl" />
          ) : enableCustomizeStudio && product !== null ? (
            <ProductCustomizeStudio
              product={product}
              setDesignUrl={setDesignurl}
            />
          ) : product ? (
            <Image
              src={product?.productimage?.[0]?.url}
              alt={product.title}
              width={400}
              height={400}
              className="object-contain rounded-xl"
            />
          ) : (
            <Skeleton className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-xl" />
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-32" />
            </>
          ) : (
            <>
              <h2 className="font-bold text-2xl md:text-3xl">{product?.title}</h2>
              <h2 className="font-bold text-xl md:text-2xl text-green-600">
                ${product?.pricing}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product?.description}
              </p>

              <div>
                <h2 className="text-lg font-medium">Size</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <Button key={size} variant={"outline"} size="sm">
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                {!enableCustomizeStudio && (
                  <Button
                    size={"lg"}
                    className="flex-1"
                    onClick={() => setEnableCustomizeStudio(true)}
                  >
                    <Palette className="mr-2" />
                    Customize
                  </Button>
                )}
                <Button
                  size={"lg"}
                  onClick={AddToCart}
                  variant={!enableCustomizeStudio ? "outline" : "default"}
                  className="flex-1"
                >
                  Add to cart
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-8">
        {loading ? (
          <>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-20 w-full" />
          </>
        ) : (
          <>
            <h2 className="font-bold text-lg mb-2">Product Description</h2>
            <p className="text-gray-600 leading-relaxed">{product?.description}</p>
          </>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <PopularProducts />
      </div>
    </div>
  );
}

export default ProductDetail;
