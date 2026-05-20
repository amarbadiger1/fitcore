import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash"
})



export const generativeModel = async (prompt) => {
    try {

        const result = await model.generateContent(prompt);

        let text = result.response.text();

        text = text.replace(/```json/g, "");
        text = text.replace(/```/g, "");

        const nutritionData = JSON.parse(text);
        return nutritionData;

    } catch (error) {
        console.log("Gemini Error ", error);
    }

} 