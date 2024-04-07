import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb Connected");
    });

    connection.on("error", (err) => {
      console.log("Error while connecting to the database", err);
      process.exit();
    });
  } catch (error) {
    console.log("Something Went wrong, while connecting to the backend");
  }
}
