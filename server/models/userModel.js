import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        // default: "https://res.cloudinary.com/dlbqw7atu/image/upload/v1747734054/userImage_dhytay.png",
        default: "https://https://jjtraumacentre.com/wp-content/uploads/2024/04/ki1.png",
    },
    role: {
        type: String,
        enum: [ "admin","user","deliveryMan"],
        default: "user",
    },
    address:[
        {
            street:{type:String,required:true},
            city:{type:String,required:true},
            postalCode:{type:String,required:true},
            country:{type:String,required:true},
            isDefault:{type:Boolean,default:false},
        },
    ],
    // whishlist:
    // cart:
    // order history:


},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;