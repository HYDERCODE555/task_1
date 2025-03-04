import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        console.log("token",token);
        
        if (!token) {
            throw new UnauthorizedException('Not authorized')
        }

        try {
            const decoded = jwt.verify(token,"00010100")
            // console.log("decoded",decoded);
            
            next()
        } catch (error) {
            console.log("Error :", error);

        }
    }
}   