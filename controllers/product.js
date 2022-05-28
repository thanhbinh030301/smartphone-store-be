import { ProductModel } from "../models/ProductModel.js";

export const getProduct = async (req, res, next) => {
    try {
        const products = await ProductModel.find({brand: "apple"});
        console.log(products);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}
