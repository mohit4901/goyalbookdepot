import express from 'express';
import { loginUser, registerUser, adminLogin, getSecurityQuestion, resetPasswordWithSecurity } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/get-security-question', getSecurityQuestion);
userRouter.post('/reset-password-security', resetPasswordWithSecurity);

export default userRouter;