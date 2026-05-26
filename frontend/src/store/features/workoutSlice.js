import { createSlice } from "@reduxjs/toolkit";


const workoutSlice = createSlice({
    name: "workout",
    initialState: {
        data: []
    },
    reducers: {
        setWorkout: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { setWorkout } = workoutSlice.actions
export default workoutSlice.reducer