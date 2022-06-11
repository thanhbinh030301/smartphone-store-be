import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    phone: {
        type: String,
        required: true    
    }, 
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    },
    admin: {
        type: Boolean,
        default: false
    }
},{timestamps: true})
export const UserModel = mongoose.model('user', UserSchema);