import express from "express"
import morgan from "morgan";
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dns from "dns"
import authRoutes from './routes/auth.routes.js'
import jwtVerification from "./middleware/jwtVerification.js"

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");
const app = express();
connectDB();
app.use(cors());
app.use(helmet());

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);



app.get("/", jwtVerification, (req, res) => {
    return res.status(200).json({
        message: "Hello world",
    })
})



export default app;