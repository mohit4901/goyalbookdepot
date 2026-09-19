import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB Connected😍");
    });

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB connection error: ", err.message);
    });

    try {
        let uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("❌ MONGODB_URI is not set in environment variables!");
            return;
        }

        if (!uri.includes('/e-commerce')) {
            if (uri.includes('?')) {
                const [base, query] = uri.split('?');
                uri = `${base.replace(/\/+$/, '')}/e-commerce?${query}`;
            } else {
                uri = `${uri.replace(/\/+$/, '')}/e-commerce`;
            }
        }

        await mongoose.connect(uri);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
    }
};

export default connectDB;