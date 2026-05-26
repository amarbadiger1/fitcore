import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice"
import workoutReducer from "./features/workoutSlice"
const store = configureStore({
    reducer: {
        user: userReducer,
        workout: workoutReducer
    }
})

export default store;