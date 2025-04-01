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

// Mongoose pre-save hook middleware function that runs before a userSchema document is saved to the database
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Compares the plain-text password with the hashed password stored in the database.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

//  Generate Access Token 
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)