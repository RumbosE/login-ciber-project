import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import db from "@/libs/db"

type userCreate = {
    username: string,
    password: string
}

export async function POST(req: Request) {
    try {
        const data : userCreate = await req.json();

        const userFound = await db.user.findUnique({
            where: {
                username: data.username
            }
        });
    
        if (!userFound) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 400
            });
        }
    
        // console.log(data);
        const matchPassword = await bcrypt.compare(data.password, userFound.password);
                if (!matchPassword) throw new Error("Password is incorrect");
    
        return NextResponse.json({
            message: "you are logged in!!!",
            user: data
        }, {
            status: 201
        });
    }
    catch (error) {
        return NextResponse.json({
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}