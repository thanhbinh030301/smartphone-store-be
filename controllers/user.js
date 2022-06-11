import { UserModel } from "../models/UserModel.js";


export const getAllUsers =  async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
}