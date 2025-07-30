'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

export type Product = {
    productImage: any;
    category: any;
    title: string,
    price: number,
    description: string,
    longDescription: string,
    pricing: number,
    isFeatured: boolean,
    size: any,
    productimage: Array<{ url: string }>;

    documentId: string;
}

function PopularProducts() {
    const [productList, setProductList] = useState<Product[]>()

    useEffect(() => {
        GetPopularProducts();
    }, [])

    const GetPopularProducts = async () => {
        const result = await axios.get('/api/products?isPopular=1');
        console.log(result.data)
        setProductList(result.data);
    }

    return (
        <div>
            <h2 className='font-bold text-3xl'>Popular Products</h2>
            <div>
                {productList?.map((product: Product, index: number) => (
                    <ProductCard key={product.documentId || index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default PopularProducts
