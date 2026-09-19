import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    securityQuestion: { type: String, default: '' },
    securityAnswer: { type: String, default: '' },
    cartData: { type: Object, default: {} }
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel