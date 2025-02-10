import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {

    // This setting ensures that only fields defined in the Mongoose schema are allowed in query filters. Any fields not defined in the schema will be ignored in queries.
    // It helps to prevent accidental querying with fields that do not exist in the schema, which can lead to more predictable and secure query behavior.
    mongoose.set("strictQuery", true); 
    

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "paper_tracker",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("MongoDB connected successfully");

    }catch(error){
        console.log("Error connecting to MongoDB: ", error);
    }
};