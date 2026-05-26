import nutritionModel from "../models/nutrition.model.js";
import userModel from "../models/user.model.js";
import { updateProfileSchema } from "../validations/user.validation.js";
import cloudinary from "../config/cloudinary.js";
import { resolve } from "dns";
import { rejects } from "assert";
import streamifier from "streamifier"

export const updateProfile = async (req, res) => {
  try {
    const id = req.id;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    let profilePic = user.profilePic;


    if (req.file) {
      const cloudinaryResponse = await new Promise(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({
            folder: "fitcore_profiles"
          },
            (error, result) => {
              if (error) {
                reject(error);
                // console.log(error);

              } else {
                resolve(result);
              }
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        })
      profilePic = cloudinaryResponse.secure_url;
    }

    const bodyData = {
      ...req.body,
      profilePic,
    };

    const validation = updateProfileSchema.safeParse(bodyData);

    if (!validation.success) {
      console.log(validation);
      return res.status(400).json({
        message: "Please enter valid inputs",
        errors: validation.error.errors
      });
    }

    // ✅ Merge old + new data (VERY IMPORTANT)
    const updatedData = {
      ...user.toObject(),
      ...validation.data
    };

    const { gender, age, weight, height, goal, activityLevel } = updatedData;

    let calories, protein, fats, carbs;

    // ✅ Only calculate if required fields exist
    if (age && weight && height && goal && activityLevel && gender) {

      const bmr =
        gender === "male"
          ? 10 * weight + 6.25 * height - 5 * age + 5
          : 10 * weight + 6.25 * height - 5 * age - 161;

      const activityMap = {
        low: 1.2,
        medium: 1.55,
        high: 1.725
      };

      const tdee = bmr * activityMap[activityLevel];

      if (goal === "weight_loss") calories = tdee - 500;
      else if (goal === "muscle_gain") calories = tdee + 300;
      else calories = tdee;

      protein = weight * 2;
      fats = weight * 0.8;

      const remainingCalories = calories - (protein * 4 + fats * 9);
      carbs = remainingCalories / 4;

      // ✅ rounding properly
      calories = Math.round(calories);
      protein = Math.round(protein);
      fats = Math.round(fats);
      carbs = Math.round(carbs);
    }

    // ✅ Update DB properly
    const updatedUserProfile = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...validation.data,
          ...(calories && {
            dailyCalorieTarget: calories,
            protein,
            carbs,
            fats
          })
        }
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUserProfile
    });

  } catch (error) {
    // console.log(error); 

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const id = req.id;

    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User Fetched successfully",
      user
    })


  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}