import { axiosClient } from "@/lib/axiosClient";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {searchParams}=new URL(req.url);
    const email=searchParams.get('email');
    try{
        const result=await axiosClient.get('/carts?filters[userEmai][$eq]='+email+'&populate=[products]-[populate][0]-productImage');
        console.log(result.data.data);
        return NextResponse.json(result.data.data);

    }catch(e){
        return NextResponse.json(e);
    }
    
}
export async function POST(req:NextRequest) {
    const {userEmail,setDesignUrl,product}=await req.json();
    const data={
        data:{
            userEmail:userEmail,
            design:setDesignUrl,
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