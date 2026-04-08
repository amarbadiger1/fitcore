import mongoose from "mongoose"
import config from "./config.js"
import chalk from "chalk"
const connectDB = async () => {
    try {
        mongoose.connect(config.MONGO_URI)
        console.log(chalk.bgYellowBright("Mongo DB Connected Successfully"));

    } catch (error) {
        console.log(chalk.bgRed("MongoDB connection error", error));
        // throw new Error("MongoDB Connection Error")

    }
}

export default connectDB;