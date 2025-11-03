import express from "express";
import { loginUser, registerUser, getUserProfile, logoutUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js"; //https://youtu.be/y31BLaEJ4JM?t=4930

const router = express.Router(); // Create a new router instance

//rgister route
router.post("/register", registerUser);

//login route
// https://youtu.be/y31BLaEJ4JM?t=3599
// https://youtu.be/y31BLaEJ4JM?t=4626

/**
* @swagger

* /api/auth/login:
*   post:
*     summary: Login user
*     tags: [Authentication]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - email
*               - password
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         description: User logged in successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 message:
*                   type: string
*                 data:
*                   type: object    
*                   properties:
*                     user:
*                       type: object
*                       properties:
*                         _id:
*                           type: string    
*                         name:
*                           type: string    
*                         email:
*                           type: string    
*                         role:
*                           type: string    
*                         avatar:
*                           type: string    
*                         createdAt:
*                           type: string    
*                         updatedAt:    
*                           type: string    
*                     token:
*                       type: string
*/

router.post("/login", loginUser);

// profile
// protect //https://youtu.be/y31BLaEJ4JM?t=4868
router.get("/profile", protect,getUserProfile);

// logout
router.post("/logout", protect, logoutUser);

export default router;