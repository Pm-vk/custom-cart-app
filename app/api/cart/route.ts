import { axiosClient } from "@/lib/axiosClient";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {searchParams}=new URL(req.url);
    const email=searchParams.get('email');
    try{
        const result=await axiosClient.get('/carts?filters[userEmail][$eq]='+email+'&populate[products][populate][0]=productimage');
        console.log('Cart API Response:', JSON.stringify(result.data.data, null, 2));
        return NextResponse.json(result.data.data);

    }catch(e){
        console.error('Cart API Error:', e);
        return NextResponse.json(e);
    }
    
}
export async function POST(req:NextRequest) {
    const {userEmail,designUrl,product}=await req.json();
    const data={
        data:{
            userEmail:userEmail,
            design:designUrl || null,
            products:{
                connect:[product?.documentId]
            }
        }
    }
    try{
        const result=await axiosClient.post('/carts',data);
        console.log(result.data);
        return NextResponse.json(result.data);

    }catch(e){
        return NextResponse.json(e);
    }
    
}