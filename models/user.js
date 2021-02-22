// set up mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
        login: {type:String, unique:true},
        password: String,
        nic: {type:String, unique:true},
        email: String,
        sex: Number,
        bday: Date,
        color: Number,
        avatarLink: String,
        type: Number,
        registrationDate: Date,
        balace: Number,
        vic: Number,
        avatarEndAt: Date,
        regDeviceId: String,
        photo: String,
        lastVisit: Date,
        zags: String,
        _class: String,
        rating: Number,
        _id: ObjectId,
    },
    {
        collection: "users"
    });
const User =  mongoose.model('User', UserSchema);
exports.User = User;
