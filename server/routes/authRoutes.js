import express from 'express';
import { registerUser,loginUser,getUserProfile,logoutUser } from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js'; //https://youtu.be/y31BLaEJ4JM?t=4935

const router = express.Router();

// register route
router.post('/register',registerUser);

// login route
router.post('/login',loginUser);

// profile
router.get('/profile', protect,getUserProfile);

// logout
router.post('/logout',protect,logoutUser);



// router.get('/login', (req, res) => {
//     res.send({ message: 'Login is working' });
// });

export default router;