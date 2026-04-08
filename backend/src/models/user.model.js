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
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    age: {
        type: Number,
        min: 10,
        max: 100
    },
    weight: {
        type: Number,
        min: 20,
        max: 300
    },
    height: {
        type: Number,
        min: 100,
        max: 250
    },
    gender: {
        type: String,
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
        type: Number
    },
    protein: {
        type: Number
    },
    carbs: {
        type: Number
    },
    fats: {
        type: Number
    }
},
    {
        timestamps: true
    }
)

const userModel = mongoose.model("users", userSchema);

export default userModel;