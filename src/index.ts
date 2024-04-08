import express from 'express'
import cors from 'cors'
import Database from "./database/connection";
import dotenv from 'dotenv'
import routes from "./routes/all.routes";

dotenv.config()


const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())

app.use('/api', routes)

app.listen(process.env?.PORT ?? 5000, () => {
    console.log("Server started...")
    const database = new Database();
    if(!database.connected && database.error){
        console.log("Database not connected: ", database.error)
    }
})

