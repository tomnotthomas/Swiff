import User from "../models/User.js";
import dotenv from 'dotenv';
dotenv.config();
export const checkForSubscription = async (req, res) => {
    const email = req.body.userEmail;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).send({ error: '404', message: 'User was not found.' });
    }
    if (user.SubscriptionStatus) {
        return res.status(200).send({ message: 'User has a subscription' });
    }
    // If the user is found and does not have a Steam ID, send a success response
    return res.status(404).send({ error: '404', message: 'User does not have a subscription' });
};
