import express from 'express';
import { registerUser } from '../controller/authController.js';

const router = express.Router();
// login rtoute
// register route
router.post('/register',registerUser);

// router.get('/login', (req, res) => {
//     res.send({ message: 'Login is working' });
// });

export default router;