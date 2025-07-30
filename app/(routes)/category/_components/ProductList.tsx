"use client"
import { Product } from '@/app/_components/PopularProducts';
import ProductCard from '@/app/_components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function ProductList() {
    const { categoryName } = useParams();
    const [loading, setLoading] = useState(false);
    const [productList, setProductList] = useState<Product[]>();
    console.log(categoryName);

    useEffect(() => {
        GetProducytByCategory();
    }, []);

    const GetProducytByCategory = async () => {
        setLoading(true);
        try {
            const result = await axios.get('/api/products?category=' + categoryName);
            console.log(result.data);
            setProductList(result.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };

    return categoryName && (
        <div>
            {/* @ts-ignore */}
            <h2 className='font-bold text-5xl'>{categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1)}</h2>
            <p className='text-lg'>Customize the premium {categoryName} for any of your occasion</p>

            {/* product list */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
                {productList && productList.length > 0 ? (
                    productList.map((product: Product, index: number) => (
                        <ProductCard product={product} key={index} />
                    ))
                ) : (
                    [1, 2, 3, 4, 5].map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductList;
