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
                status: 404
            });
        }
    
        // console.log(data);
        const matchPassword = await bcrypt.compare(data.password, userFound.password);
                if (!matchPassword) {
                    return NextResponse.json({
                        message: "Password not found"
                    }, {
                        status: 404
                    });
                }

        return NextResponse.json({
            message: "you are logged in!!!",
            user: data
        }, {
            status: 200
        })
    }
    catch (error) {
        return NextResponse.json({
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}