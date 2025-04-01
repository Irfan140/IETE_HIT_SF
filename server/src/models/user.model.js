import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        college: {
            type: String,
            trim: true
        },
        department: {
            type: String,
            trim: true
        },
        rollNumber: {
            type: String,
            trim: true
        },
        contactNumber: {
            type: String,
            trim: true
        },
        whatsappNumber: {
            type: String,
            trim: true
        },
        profileImage: {
            type: String, // Cloudinary URL
            required: true
        },
        refreshToken: {
            type: String // Token for refreshing access tokens
        }
    },
    {
        timestamps: true
    }
);



export const User = mongoose.model("User", userSchema)