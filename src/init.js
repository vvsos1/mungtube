import './db';
import app from "./app";

const PORT = 80;

function handleListening() {
    console.log(`Server Running On http://localhost:${PORT}`);
}

app.listen(80,handleListening);