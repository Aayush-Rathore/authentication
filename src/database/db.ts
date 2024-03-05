import mongoose from "mongoose";

const MONGO_DB_URL: string | undefined = process.env.MONGO_DB_URL;

const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGO_DB_URL}/${process.env.DB_NAME}`
    );
    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error: any) {
    console.error("ERROR: ", error);
    process.exit(1);
  }
};

export default connectDB;
