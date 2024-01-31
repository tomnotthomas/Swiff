import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    games: {
        type: Array,
        required: false,
    },
    selectedGames: {
        type: Array,
        required: false,
    },
    virtualMachine: {
        type: String,
        required: false,
    },
    SubscriptionStatus: {
        type: Boolean,
        default: false,
        required: false,
    },
});
const User = mongoose.model('User', userSchema);
export default User;
