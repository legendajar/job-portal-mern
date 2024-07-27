import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }

        req.id = decoded.userId;
        next();
    } catch (err) {
        console.log(err)
        return res.status(501).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export default isAuthenticated;