import jwt from "jsonwebtoken"
import config from "../config/config.js";

const jwtVerification = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        // if (!authHeader || authHeader.startsWith("Bearer ")) {
        //     return res.status(401).json({
        //         message: "Not Authorized - No token"
        //     })
        // }
        // const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, config.JWT_SECRET)

        req.id = decoded.id

        next();

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export default jwtVerification;