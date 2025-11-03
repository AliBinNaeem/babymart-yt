import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// register user
const registerUser = asyncHandler(async (req, res) => {
    console.log("req",req.body);
    const { name, email, password,role } = req.body;

    // if userexists check via email
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists, Try login");
    }

    // create new user
    const user = await User.create({
        name,
        email,
        password,
        role,
        addressed: []
    });
    
    // if user created successfully
    if (user) {
        // HTTP status code 201 Created indicates that the client's request was successful and a new source has been created on the sewer. This is commonly retumed in sponse to a POST request.

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            addressed: user.addresses,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

     
    
    res.status(200).json({message: "Register route is working"});
});

// loginUser
const loginUser = asyncHandler(async (req, res) => {
   const { email, password } =  req.body;
   console.log("Login attempt",{email});

   const user = await User.findOne({email});
   if (user && (await user.matchPassword(password))) {
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        addressed: user.addresses,
        token: generateToken(user._id),
    });
   }else{
    res.status(401);
    throw new Error("Invalid email or password");
   }

}); 

// getUserProfile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            addressed: user.addresses,
            //token: generateToken(user._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// logout
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({success: true, message: "Logout successful" });
});

export { registerUser, loginUser, getUserProfile, logoutUser };