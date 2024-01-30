var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.js";
// import {Request, Response} from 'express';
export function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const { email } = req.body;
        const user = yield User.findOne({ email: email });
        if (user) {
            res.status(409)
                .send({ error: '409', message: 'User already exists' });
            return;
        }
        try {
            const newUser = new User(Object.assign({}, req.body));
            const savedUser = yield newUser.save();
            res.status(201).send(savedUser);
        }
        catch (error) {
            res.status(400).send({ error, message: 'Could not save image' });
        }
    });
}
;
