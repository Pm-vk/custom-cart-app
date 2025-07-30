// types/index.d.ts
export interface CartItem {
    products: any;
    design: string;
    product: {
        id: string;
        title: string;
        pricing: number;
        description: string;
        productimage: { url: string }[];
    };
    userEmail?: string;
}

export interface User {
    name: string;
    email: string;
    image: string;
    // Add any other user properties you need
}