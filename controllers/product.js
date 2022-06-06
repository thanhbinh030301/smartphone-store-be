import { ProductModel } from "../models/ProductModel.js";

export const getProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({brand: "apple"});
        console.log(products);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const getProductBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        console.log(slug);
        const product = await ProductModel.findOne({slug: `${slug}`});
        // console.log(product);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}
