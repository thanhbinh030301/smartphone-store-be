import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({
    brand: {
        type: String
    },
    image: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: Number
    }
})
export const ProductModel = mongoose.model('product', ProductSchema);