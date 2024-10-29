import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
dotenv.config();

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ Limit: "40kb" }));
app.use(express.urlencoded({ Limit: "40kb", extended: true }));

app.use("/api/v1/user", userRoutes)

app.get('/', (req, res) => {
    return res.json({ message: "Hello, world!" });
  });

const start = async () => {
  try {
    const connectionDb = await mongoose.connect("mongodb+srv://anas49:anasmeetUp@meetup.sv7wt.mongodb.net/?retryWrites=true&w=majority&appName=MeetUp");
    console.log(`db connect at ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`app is listenning on port 8000`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
