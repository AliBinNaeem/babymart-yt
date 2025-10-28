import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
// register user
const registerUser= asyncHandler (async (req, res) => {
  console.log("req",req.body);
  const { name, email, password,role } = req.body;

  const userExists = await User.findOne({ email }); // Replace with actual user existence check

    if (userExists) {
        res.status(400);
        throw new Error('User already exists, Try login');
    }
    
    const user = await User.create({
        name,
        email,
        password,
        role,
        address: []
    });

  // Here, you would typically add logic to save the user to your database.
  // For demonstration purposes, we'll just return a success message.
    // res.status(200).json({ message: 'Register route is working' });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        address: user.address,
        // token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
});

export {registerUser};