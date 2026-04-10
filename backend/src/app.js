import express from "express"
import morgan from "morgan";
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dns from "dns"
import authRoutes from './routes/auth.routes.js'
import userRoutes from "./routes/user.routes.js"
import nutritionRoutes from "./routes/nutrition.routes.js"
import jwtVerification from "./middleware/jwtVerification.js"

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");
const app = express();
connectDB();
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));
app.use(cors())

app.use(helmet());

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/nutrition", nutritionRoutes)


// app.get("/", jwtVerification, (req, res) => {
//     return res.status(200).json({
//         message: "Hello world",
//     })
// })


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// 404 middleware
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});


export default app;