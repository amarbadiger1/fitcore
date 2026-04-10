import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    profilePic: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        min: 10,
        max: 100,
        default: 0
    },
    weight: {
        type: Number,
        min: 20,
        max: 300,
        default: 0
    },
    height: {
        type: Number,
        min: 100,
        max: 250,
        default: 0
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    goal: {
        type: String,
        enum: ["weight_loss", "muscle_gain", "maintain"],
    },
    activityLevel: {
        type: String,
        enum: ["low", "medium", "high"],
    },
    dailyCalorieTarget: {
        type: Number,
        default: 0
    },
    protein: {
        type: Number,
        default: 0
    },
    carbs: {
        type: Number,
        default: 0
    },
    fats: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }
)

const userModel = mongoose.model("User", userSchema);

export default userModel;