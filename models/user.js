import mongoose from "mongoose";
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        requred: true
    },
    email: {
        type: String,
        trim: true,
        requred: true,
        unique: true
    },
    password: {
        type: String,
        requred: true,
        min: 6,
        max: 64
    },
    number: {
        type: Number
    },
    about: {},
    photo: String,
    following: [{type: Schema.ObjectId, ref: "User"}],
    followers: [{ type: Schema.ObjectId, ref: "User"}],
    products: [{type: Schema.ObjectId, ref: "User"}]
}, {timestamp: true});

export default mongoose.model('User', userSchema);