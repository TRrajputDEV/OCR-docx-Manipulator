// src/controllers/processing.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ImageService from "../services/imageService.js";
import path from 'path';
import fs from 'fs/promises';

const resizeImage = asyncHandler(async (req, res) => {
    const { fileId, width, height } = req.body;

    if (!fileId) {
        throw new ApiError(400, "File ID is required");
    }

    // Default dimensions if not provided
    const targetWidth = parseInt(width) || 500;
    const targetHeight = parseInt(height) || 500;

    try {
        // Find the uploaded file (you might want to store file paths in database)
        const inputPath = path.join(process.cwd(), 'public', 'temp', fileId);

        // Check if file exists
        await fs.access(inputPath);

        // Generate output filename
        const outputFileName = `resized_${Date.now()}_${path.basename(fileId)}`;
        const outputPath = path.join(process.cwd(), 'public', 'temp', outputFileName);

        // Resize the image
        const result = await ImageService.resizeImage(
            inputPath,
            outputPath,
            targetWidth,
            targetHeight
        );

        // Get file stats
        const stats = await fs.stat(outputPath);
        const originalStats = await fs.stat(inputPath);

        return res.status(200).json(
            new ApiResponse(200, {
                originalFile: fileId,
                processedFile: outputFileName,
                originalSize: originalStats.size,
                newSize: stats.size,
                dimensions: result.dimensions,
                downloadUrl: `/api/v1/users/download/${outputFileName}`
            }, "Image resized successfully")
        );

    } catch (error) {
        throw new ApiError(500, `Processing failed: ${error.message}`);
    }
});

const generateThumbnails = asyncHandler(async (req, res) => {
    const { fileId } = req.body;

    if (!fileId) {
        throw new ApiError(400, "File ID is required");
    }

    try {
        const inputPath = path.join(process.cwd(), 'public', 'temp', fileId);
        await fs.access(inputPath);

        const baseOutputPath = path.join(
            process.cwd(),
            'public',
            'temp',
            `processed_${Date.now()}`
        );

        const results = await ImageService.generateMultipleSizes(inputPath, baseOutputPath);

        // Add downloadUrl to each processed file
        const processedFilesWithUrls = results.map(r => ({
            ...r,
            downloadUrl: `/api/v1/users/download/${path.basename(r.outputPath)}`
        }));

        return res.status(200).json(
            new ApiResponse(200, {
                originalFile: fileId,
                processedFiles: processedFilesWithUrls
            }, "Thumbnails generated successfully")
        );

    } catch (error) {
        throw new ApiError(500, `Thumbnail generation failed: ${error.message}`);
    }
});

export {
    resizeImage,
    generateThumbnails
};
