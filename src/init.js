import './db';
import app from "./app";
import dotenv from "dotenv";
import './models/Video';
import './models/Comment';
dotenv.config();

const {PORT = 80} = process.env;

function handleListening() {
    console.log(`Server Running On http://localhost:${PORT}`);
}

app.listen(80,handleListening);