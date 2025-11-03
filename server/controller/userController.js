import asyncHandler from "express-async-handler";   
import User from "../models/userModel.js";
// getUsers

const getUsers  = asyncHandler(async (req, res) => {
// User.find({}) → Fetches all user documents from the MongoDB collection.
// (Empty {} means no filter — it gets every record.)
// .select("-password") → Excludes the password field from the returned documents.
// The minus (-) sign means don’t include this field.

    const users = await User.find({}).select("-password");
    res.status(200).json({
        success: true,
        users
    });
});

// create user
const createUser = asyncHandler(async (req, res) => {
    const {name,email,password,role,addresses} = req.body;
    // is user exist
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        email,
        password,
        role,
        addresses: addresses || []
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            addressed: user.addresses,
           
        });
    }else{
        res.status(400);
        throw new Error("User not created");
    }
    res.status(200).json({
        success: true,
        user
    });
});

// getUserById
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

// updateUser
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user){
        res.status(404);
        throw new Error("User not found");
    }
    // Allow updates by the user themselves or admins
    
    // https://youtu.be/y31BLaEJ4JM?t=6593
    // if (user._id.toString() !== req.user._id &&  req.user.role !== 'admin') {
    //     res.status(403);
    //     throw new Error('User not authorized\n' + req.user._id + "\n" + user._id.toString());
    // }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.avatar = req.body.avatar || user.avatar;
    user.addresses = req.body.addresses || user.addresses;
    const updatedUser = await user.save();
    res.status(200).json({
        // success: true,
        // user: updatedUser
        _id : updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        addressed: updatedUser.addresses
    });
    
});


// deleteUser
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        // remvove orders

        // await user.remove();
        await user.deleteOne();
        res.status(200).json({ 
            status: 'success',
            message: 'User removed' 
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});



export {getUsers,createUser,getUserById,updateUser,deleteUser};