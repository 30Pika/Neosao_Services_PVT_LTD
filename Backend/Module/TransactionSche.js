import mongoose from "mongoose";

const TransactionSche = new mongoose.Schema({
    type: { type: String, required: true },
    amount: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model("Transaction", TransactionSche);
