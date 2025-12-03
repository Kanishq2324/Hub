import mongoose from "mongoose";

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/HUB`)
        console.log(`\nMongoDB connected !! DB Host: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB connection failed: ", error);
        process.exit(1)
    }
}

export default connectDB;