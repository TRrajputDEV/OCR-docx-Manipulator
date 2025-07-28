import {ApiError} from '../utils/ApiError.js'

const home = (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Home Page</title>
            </head>
            <body>
                <h1>Welcome to the OCR Manipulator Home Page!</h1>
                <p>This is the backend home endpoint.</p>
            </body>
        </html>
    `);
}


export{home} 