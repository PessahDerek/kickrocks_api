import * as mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


class Database{
    connected: boolean = false;
    error: Error | undefined;
    constructor() {
        mongoose.connect(process.env?.MONGODB??"")
            .then(()=>{
                console.log("Database connected...")
            })
            .catch(err => {
                this.error = err
                console.log(`Error connecting to database: ${err}`)
            })
    }


}


export default Database
