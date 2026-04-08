# 🗄️ Database Design (MongoDB)

This project uses **MongoDB with Mongoose** and follows a scalable, modular schema design.

---

# 📦 Collections Overview

* Users
* NutritionLogs
* Meals
* MealItems
* WorkoutLogs
* Exercises
* Progress
* Achievements

---

# 👤 1. Users Collection

Stores user profile and fitness goals.

### Fields:

```json
{
  "name": "string",
  "email": "string",

  "age": "number",
  "weight": "number",
  "height": "number",
  "gender": "string",

  "goal": "weight_loss | muscle_gain | maintain",
  "activityLevel": "low | medium | high",

  "dailyCalorieTarget": "number",
  "protein": "number",
  "carbs": "number",
  "fats": "number",

  "createdAt": "date",
  "updatedAt": "date"
}
```

---

# 🥗 2. NutritionLogs Collection

Stores daily nutrition summary.

### Fields:

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "date": "YYYY-MM-DD",

  "totalCalories": "number",
  "totalProtein": "number",
  "totalCarbs": "number",
  "totalFats": "number",

  "waterIntake": "number",

  "createdAt": "date"
}
```

---

# 🍽️ 3. Meals Collection

Each meal belongs to a nutrition log.

### Fields:

```json
{
  "_id": "ObjectId",
  "nutritionLogId": "ObjectId",

  "type": "breakfast | lunch | dinner | snack",
  "createdAt": "date"
}
```

---

# 🍎 4. MealItems Collection

Individual food items inside a meal.

### Fields:

```json
{
  "_id": "ObjectId",
  "mealId": "ObjectId",

  "name": "string",
  "calories": "number",
  "protein": "number",
  "carbs": "number",
  "fats": "number",

  "photo": "string (optional)",

  "createdAt": "date"
}
```

---

# 🏋️ 5. WorkoutLogs Collection

Stores workout sessions.

### Fields:

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "date": "YYYY-MM-DD",

  "totalDuration": "number",
  "caloriesBurned": "number",

  "createdAt": "date"
}
```

---

# 💪 6. Exercises Collection

Exercises inside a workout.

### Fields:

```json
{
  "_id": "ObjectId",
  "workoutLogId": "ObjectId",

  "name": "string",

  "sets": [
    {
      "reps": "number",
      "weight": "number"
    }
  ],

  "duration": "number"
}
```

---

# 📊 7. Progress Collection

Tracks body metrics over time.

### Fields:

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "date": "YYYY-MM-DD",

  "weight": "number",
  "bodyFat": "number",
  "muscleMass": "number",

  "notes": "string",

  "createdAt": "date"
}
```

---

# 🏆 8. Achievements Collection

Stores user achievements and badges.

### Fields:

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",

  "badges": [
    {
      "name": "string",
      "icon": "string",
      "earnedAt": "date"
    }
  ]
}
```

---

# 🔗 Relationships (Important)

```text
User → NutritionLogs → Meals → MealItems
User → WorkoutLogs → Exercises
User → Progress
User → Achievements
```

---

# 🧠 Design Decisions

### 1. Normalized Structure

* Meals and MealItems are separated for scalability

### 2. Avoid Large Documents

* Prevents performance issues in MongoDB

### 3. Indexed Queries (Later)

* userId + date will be indexed for fast lookup

---

# ⚡ Future Improvements

* Add indexing for performance
* Add soft deletes
* Add versioning for logs
* Add AI-generated fields

---

# 🚀 Next Step

* Create Mongoose models for:

  * User
  * NutritionLog

* Connect MongoDB

* Start first API

---
