import mongoose, { Schema } from 'mongoose';
import { IUser, userRoles } from '../types.js';



const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: userRoles,
        default: "USER"
    },
    password: {
        type: String,
        required: true
    },
    refresh: {
        type: String,
        required: false
    }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;