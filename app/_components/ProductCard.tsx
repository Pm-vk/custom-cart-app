import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link"; 
import { Palette } from "lucide-react";

type Props = {
  product: {
    title: string;
    documentId?: string;
    productimage: Array<{
      url: string;
    }>;
  };
};

function ProductCard({ product }: Props) {
  const imageUrl = product.productimage?.[0]?.url;

  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center space-y-3">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={product.title}
          width={200}
          height={200}
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-cover rounded-lg"
        />
      ) : (
        <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
          No Image
        </div>
      )}
      <h3 className="font-semibold text-lg">{product.title}</h3>
      <Link href={`/product/${product?.documentId}`} className="w-full">
        <Button className="w-full mt-2 hover:bg-gray-700 transition-colors duration-300 flex justify-center">
          <Palette className="mr-2" /> Customize
        </Button>
      </Link>
    </div>
  );
}

export default ProductCard;
