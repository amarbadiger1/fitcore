import dotenv from "dotenv"
dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not Present in the environment")
}

if (!process.env.PORT) {
    throw new Error("PORT is not Present in the environment")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not Present in the environment")
}

if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("CLOUDINARY_CLOUD_NAME is not Present in the environment")
}
if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error("CLOUDINARY_API_KEY is not Present in the environment")
}
if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error("CLOUDINARY_API_SECRET is not Present in the environment")
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}

export default config