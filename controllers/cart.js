import { CartModel } from "../models/CartModel.js";
import { ProductModel } from "../models/ProductModel.js";

export const getCarts = async (req, res) => {
    try {
        const carts = await CartModel.find();
        console.log(carts);
        return res.status(200).json(carts);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const createCart = async (req, res) => {
    //validate request
    if(!req.body){
        return res.status(401).send("Giỏ hàng trống");
    }
    try {
        const newCart = new CartModel({
            userId: req.body.userId,
            userName: req.body.userName,
            address: req.body.address,
            products: req.body.products,
            totalPrice: req.body.totalPrice,
        })
    const cart = await newCart.save();
    return res.status(200).json(cart);  
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
};
export const getCartByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const carts = await CartModel.find({userId: userId}).exec();
        return res.status(200).json(carts);
    } catch (err) {
        return res.status(500).json(err);
    }
}