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
                {loading ? (
                    // Loading skeletons
                    Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                            <Skeleton className="h-48 w-full rounded-lg mb-4" />
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))
                ) : productList && productList.length > 0 ? (
                    // Products found
                    productList.map((product: Product, index: number) => (
                        <ProductCard product={product} key={index} />
                    ))
                ) : (
                    // Coming Soon section for mugs and posters
                    (categoryName === 'mugs' || categoryName === 'posters') ? (
                        <div className="col-span-full">
                            <div className="text-center py-16 bg-gradient-to-r from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
                                <div className="text-6xl mb-4">🚧</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    Coming Soon!
                                </h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    We're working hard to bring you amazing {categoryName} designs. 
                                    This category will be available soon with exciting customization options.
                                </p>
                                <div className="flex justify-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                                        In Development
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                        Custom Designs
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Quality Products
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Empty state for other categories
                        <div className="col-span-full">
                            <div className="text-center py-16 bg-gray-50 rounded-2xl">
                                <div className="text-4xl mb-4">📦</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    No products available
                                </h3>
                                <p className="text-gray-600">
                                    No products found in this category at the moment.
                                </p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default ProductList;
