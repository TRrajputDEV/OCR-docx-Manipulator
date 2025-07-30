import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import path from 'path';
import fs from 'fs/promises';
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

const uploadFile = asyncHandler(async (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }

    const fileData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        destination: req.file.destination
    };

    return res
        .status(201)
        .json(new ApiResponse(201, fileData, "File uploaded successfully"));
})

const downloadFile = asyncHandler(async (req, res) => {
    const { filename } = req.params;

    const filePath = path.join(process.cwd(), 'public', 'temp', filename);

    try {
        await fs.access(filePath);
        res.download(filePath);
    } catch (error) {
        throw new ApiError(404, "File not found");
    }
});

export { home, uploadFile, downloadFile } 