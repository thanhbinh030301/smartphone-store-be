
import { UserModel } from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        //create a new user
        const newUser = await new UserModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            password: hashed,
        });
        //save to db
        if(await UserModel.findOne({email: req.body.email})){
            return res.status(401).json("Email đã tồn tại");
        }
        const user = await newUser.save();
        return res.status(200).json(user);
    }catch(err) {
        return res.status(400).json(err);
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_ACCESS_KEY,
        {expiresIn: "1d"}
    );
}
// const generateRefreshToken = (user) => {
//     return jwt.sign(
//         {
//             id: user.id,
//             admin: user.admin
//         },
//         process.env.JWT_REFRESH_KEY,
//         {expiresIn: "365d"}
//     );
// }

export const loginUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if(!user){
            return res.status(401).json("Tài khoản không tồn tại");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(401).json("Sai mật khẩu");
        }
        if(user && validPassword){
            const accessToken = generateAccessToken(user);
            // const refreshToken = generateRefreshToken(user);

            // res.cookie("refreshToken", refreshToken,{
            //     httpOnly: true,
            //     secure: false,
            //     path: "/",
            //     sameSite: "strict",
            // })
            const {password, ...others} = user._doc;
            return res.status(200).json({...others, accessToken});
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

// export const refreshToken = async (req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     if(!refreshToken) return res.status(401).json("You're not authenticated");
//     jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
//         if(err){
//             return err;
//         }
//         const newAccessToken = generateAccessToken(user);
//         const newRefreshToken = generateRefreshToken(user);
//         res.cookie("newRefreshToken", newRefreshToken,{
//             httpOnly: true,
//             secure: false,
//             path: "/",
//             sameSite: "strict",
//         });
//         return res.status(200).json({accessToken: newAccessToken})
//     })
//     return res.status(200).json(refreshToken);
// }
