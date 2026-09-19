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

        // Database name where existing products/orders/users are stored (defaults to 'test')
        const dbName = process.env.DB_NAME || 'test';

        const match = uri.match(/^mongodb(\+srv)?:\/\/[^/]+\/([^?]+)/);
        if (!match || !match[2]) {
            if (uri.includes('?')) {
                const [base, query] = uri.split('?');
                uri = `${base.replace(/\/+$/, '')}/${dbName}?${query}`;
            } else {
                uri = `${uri.replace(/\/+$/, '')}/${dbName}`;
            }
        }

        await mongoose.connect(uri);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
    }
};

export default connectDB;