import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string;
    iat?: number;
    exp?: number;
}

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ""
        
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET!) as DecodedToken
        return decodedToken.id
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An Unknown Error Occurred"
        throw new Error(errorMessage)
    }
}