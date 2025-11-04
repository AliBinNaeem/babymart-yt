import express from 'express';
import {protect ,admin} from '../middleware/authMiddleware.js';
import {createUser, getUsers, getUserById, updateUser, deleteUser } from '../controller/userController.js';

const router = express.Router();

// / route
//getUsers =>  http://localhost:8080/api/users
//https://youtu.be/y31BLaEJ4JM?t=5714
// https://youtu.be/y31BLaEJ4JM?t=6073
router.route('/')
.get(protect,admin, getUsers)
.post(protect,admin,createUser); //https://youtu.be/y31BLaEJ4JM?t=6221

// create user = > http://localhost:8080/api/users post request pass json body
// {
//     "name": "Test User",
//     "email": "i4M5l@example.com",
//     "password": "123456",
//     "role": "admin"
//   }
 
// /:id route
router
.route('/:id')
.get(protect,getUserById)
.put(protect,updateUser)
//https://youtu.be/y31BLaEJ4JM?t=6718
// postman updateUser example  http://localhost:8080/api/users/64b8f3f4f1d2c2e5b6a7c8d9  put request
// {
//     "name": "Updated User",
//     "email": "i4M5l@example.com",    
//     "role": "admin"
//   }

.delete(protect,admin,deleteUser);
// https://youtu.be/y31BLaEJ4JM?t=7126
// delete user => http://localhost:8080/api/users/64b8f3f4f1d2c2e5b6a7c8d9 delete request

// /:.id/addresses
// /:.id/addresses/:addressId


export default router;