import "./db";
import dotenv from "dotenv";
import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const { PORT = 80 } = process.env;

function handleListening() {
  console.log(`Server Running On http://localhost:${PORT}`);
}

app.listen(80, handleListening);
