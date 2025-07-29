import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'
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

const uploadFile = asyncHandler(async(req, res) =>{
    
    return res
    .status(201)
    .json(new ApiResponse(201, "doc uploaded i think... successfully"));
})

export{home, uploadFile} 