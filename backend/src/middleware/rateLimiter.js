import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next)=>{
    try {
        const { success } = await rateLimit.limit("some_app");
        if(!success) return res.status(429).json({message:"Too Many Requests"})
        next();
    } catch (e) {
        console.log("Rate limit error", e)
        next(e.message)
    }
}
export default rateLimiter;