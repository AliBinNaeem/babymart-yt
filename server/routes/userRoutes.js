import express from "express";
import { protect , admin} from "../middleware/authMiddleware.js";
import { get } from "mongoose";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controller/userController.js";

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
// /:id/addresses
// /:id/addresses/:addressId

export default router;