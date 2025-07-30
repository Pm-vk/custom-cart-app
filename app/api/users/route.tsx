import { axiosClient } from "@/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, email, picture } = await req.json();
    try {
        const data = {
            fullname: name,
            exmail: email,
            picture: picture
        };
        const result = await axiosClient.post('user-lists', data);
        console.log(result);
        return NextResponse.json(result.data);
    } catch (e: any) {
        return NextResponse.json({ error: e.message });
    }
}
