import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {});
    console.log(`Mongodb Connected: ${conn.connection.host}`);
  }
  catch(error:any) {
    console.log(`Error: ${error.message as string}`);
    process.exit(1)
  }
}
export default connectDB;