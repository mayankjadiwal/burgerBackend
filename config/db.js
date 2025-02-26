import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://burger:987654321@cluster0.s5gpz.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}