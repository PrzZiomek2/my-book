import { Schema, model } from "mongoose";


const UserSchema = new Schema({
   email: String,
   name: String,
   password: String
});

export const User = model("users", UserSchema);

