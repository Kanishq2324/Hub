import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        credits: {
            type: Number,
            default: 20
        },
    }, 
    {timestamps: true}
);


// Pre Middleware to hash password before saving
userSchema.pre('save', async function (){
    if(!this.isModified("password")) {return ;}

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
   
})


userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)  // return true or false
}


export const User = mongoose.model("User", userSchema);