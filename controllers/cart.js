import { CartModel } from "../models/CartModel.js";
import { ProductModel } from "../models/ProductModel.js";

export const getCart = async (req, res) => {
    try {
        const carts = await CartModel.find();
        console.log(carts);
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const addToCart = async (req, res) => {
    try{
        const newCart = req.body;
        console.log(newCart);
        const cart = new CartModel(newCart)
        await cart.save();
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
export const deleteCart = async (req, res) => {
    console.log(req.params.id)
    await CartModel.findOneAndDelete(req.params.id)
        .then(res.status(200).json(req.params.id))
        .catch(err => next(err));
  };