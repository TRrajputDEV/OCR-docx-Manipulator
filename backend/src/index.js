import { app } from "./app.js";
import dotenv from 'dotenv';
// import db and run here...


try {
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })
} catch (error) {
    console.log(`Exception Happend at index.js ${error}`);
}