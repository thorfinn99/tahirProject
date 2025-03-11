import jwt from "jsonwebtoken"

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User Not Authenticated",
                succes: false
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            })
        }
        req.id = decode.userId
        next()
    } catch (error) {
        console.error("JWT Authentication Error:", error.message);
        return res.status(401).json({
            message: "Authentication Failed",
            success: false,
            error: error.message
        });
    }
}
export default isAuthenticated;