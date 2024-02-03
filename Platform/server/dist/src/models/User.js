import mongoose from "mongoose";
const Schema = mongoose.Schema;
const gameSchema = new Schema({
    appid: Number,
    name: String,
    playtime_forever: Number,
    img_icon_url: String,
    has_community_visible_stats: Boolean,
    playtime_windows_forever: Number,
    playtime_mac_forever: Number,
    playtime_linux_forever: Number,
    rtime_last_played: Number,
    content_descriptorids: [Number],
    playtime_disconnected: Number,
});
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    userName: {
        type: String,
        required: false
    },
    steamID: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
    zone: {
        type: String,
        required: true,
    },
    games: {
        type: [gameSchema],
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
