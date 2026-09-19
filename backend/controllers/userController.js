import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {

        const { name, email, password, securityQuestion, securityAnswer } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (minimum 8 characters)" })
        }

        if (!securityQuestion || !securityAnswer || !securityAnswer.trim()) {
            return res.json({ success: false, message: "Please select a security question and provide an answer" })
        }

        // hashing user password & security answer
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const cleanAnswer = securityAnswer.trim().toLowerCase()
        const hashedAnswer = await bcrypt.hash(cleanAnswer, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            securityQuestion,
            securityAnswer: hashedAnswer
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token, message: "Account created successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route to get security question for password reset
const getSecurityQuestion = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "No account found with this email" });
        }

        if (!user.securityQuestion) {
            return res.json({
                success: false,
                message: "No security question was set for this account. Please contact support."
            });
        }

        res.json({
            success: true,
            securityQuestion: user.securityQuestion
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route to reset password after verifying security answer
const resetPasswordWithSecurity = async (req, res) => {
    try {
        const { email, securityAnswer, newPassword } = req.body;

        if (!email || !securityAnswer || !newPassword) {
            return res.json({ success: false, message: "All fields are required" });
        }

        if (newPassword.length < 8) {
            return res.json({ success: false, message: "New password must be at least 8 characters" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.securityAnswer) {
            return res.json({ success: false, message: "No security answer was set for this user." });
        }

        const cleanAnswer = securityAnswer.trim().toLowerCase();
        const isMatch = await bcrypt.compare(cleanAnswer, user.securityAnswer);

        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect security answer! Please try again." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password reset successfully! Please login with your new password." });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser, adminLogin, getSecurityQuestion, resetPasswordWithSecurity }