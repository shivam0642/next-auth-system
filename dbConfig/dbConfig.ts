import mongoose, { mongo } from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDb Connected');  
        })
        connection.on('error',(err)=>{
            console.log('MongoDb Connection Error: ', err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong while connecting to the database', error);
        console.log(error); 
    }
}