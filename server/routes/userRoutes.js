import express from "express";
import { protect , admin} from "../middleware/authMiddleware.js";
import { get } from "mongoose";
import { addAddress, createUser, deleteAddress, deleteUser, getUserById, getUsers, updateAddress, updateUser } from "../controller/userController.js";

const router = express.Router();

// / route
router.route("/")
.get(protect,admin,getUsers) 
.post(protect,admin,createUser);

// /:id route
router
.route("/:id")
.get(protect,getUserById)
.put(protect,updateUser)
.delete(protect,admin,deleteUser);

// /:id/addresses //https://youtu.be/y31BLaEJ4JM?t=7916
router.route("/:id/addresses")
.post(protect,addAddress)

// /:id/addresses/:addressId //https://youtu.be/y31BLaEJ4JM?t=7929
router.route("/:id/addresses/:addressId")
.put(protect,updateAddress)
.delete(protect,deleteAddress)


export default router;