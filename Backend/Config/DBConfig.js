import mongoose from "mongoose";

const ConnectDB = async (Mongo_URL) => {
    try {
        await mongoose.connect(Mongo_URL);
    } catch (error) {
        console.log(`Error From Mongo Db Connection ${error}`);
    }
}

export default ConnectDB;