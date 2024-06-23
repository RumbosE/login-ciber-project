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
    
        if (userFound) {
            return NextResponse.json({
                message: "UserName already exists"
            }, {
                status: 400
            });
        }
    
        // console.log(data);
        const hashedPassword = await bcrypt.hash(data.password, 10);
    
        const newUser = await db.user.create({
            data: {
                username: data.username,
                password: hashedPassword
            }
        });
    
        const {password: _, ...user} = newUser;
    
        return NextResponse.json({
            message: "User created",
            user: user
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