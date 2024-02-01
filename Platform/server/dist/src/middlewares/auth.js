import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;
export async function auth(req, res, next) {
    try {
        //   get the token from the authorization header
        const token = await req.headers.authorization.split(" ")[1];
        //check if the token matches the supposed origin
        const decodedToken = await jwt.verify(token, jwtSecret);
        // retrieve the user details of the logged in user
        const user = await decodedToken;
        // pass the user down to the endpoints here
        req.user = user;
        // pass down functionality to the endpoint
        next();
    }
    catch (error) {
        res.status(401).json({
            error: new Error("Invalid request to auth!"),
        });
    }
}
;
