import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Type your username..."
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "******"
                }
            },
            authorize: async (credentials) => {
                console.log(credentials);
                if (!credentials) {
                    throw new Error("Credentials are missing.");
                }

                // Find user in database
                const userFound = await db.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                })
                if (!userFound) throw new Error("User not found");

                console.log(userFound);

                // Check password
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

                if (!matchPassword) throw new Error("Password is incorrect");

                return {
                    id: userFound.id.toString(), // Convert to string
                    name: userFound.username,
                };

            }
        })
    ],
    secret: process.env.SECRET || "SECRET",
    pages: {
        signIn: "/auth/login",
    },
}

export default NextAuth(authOptions)
