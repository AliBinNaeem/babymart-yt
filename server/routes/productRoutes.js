import express from "express";
import { admin, protect } from "../middleware/authMiddleware";
import { createProduct } from "../controller/productController.js";

const router = express.Router();

// getProducts
router.route("/").post(protect,admin,createProduct);

// createProducts



export default router;  
