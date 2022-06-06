import mongoose from 'mongoose';


const CartSchema = new mongoose.Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    },  
    brand: {
        type: String
    },  
    image: {
        type: String
    },
    color: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    capacity: {
        type: String
    },   
})
export const CartModel = mongoose.model('cart', CartSchema);