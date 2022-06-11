import mongoose from 'mongoose';
import { ProductModel } from './ProductModel.js';
import { UserModel } from './UserModel.js';
const { Schema } = mongoose;

let ItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
    },
    name: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    color: {
        type: String,
    },
    capacity: {
        type: String,
    },
    total: {
        type: Number,
        required: true,
    }
})
const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    userName: {
        type: String
    },
    address:{
        type: String,
    },
    products: [ItemSchema],
    totalPrice: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now(),
    }
},{timestamps: true})
export const CartModel = mongoose.model('cart', CartSchema);