import { Request, Response } from "express";
import User from "~/models/User";

export class UsersController {

    public static async postUser(req: Request, res: Response) {
        try {
            const {
                username,
                password
            } = req.body;
            const user = await User.create({
                username,
                password
            });
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }

}