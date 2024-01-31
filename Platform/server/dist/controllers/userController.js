import User from "../models/user.js";
// import {Request, Response} from 'express';
export async function createUser(req, res) {
    console.log(req.body);
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        res.status(409)
            .send({ error: '409', message: 'User already exists' });
        return;
    }
    try {
        const newUser = new User({
            ...req.body,
        });
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    }
    catch (error) {
        res.status(400).send({ error, message: 'Could not save image' });
    }
}
;
