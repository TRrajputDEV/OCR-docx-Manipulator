// src/services/apiService.js
const API_BASE_URL = 'http://localhost:4000/api/v1';

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file); // Make sure this matches your backend field name

    try {
        const response = await fetch(`${API_BASE_URL}/users/uploadfile`, {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header - let browser set it with boundary
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("File uploaded data: ", data);
        return data;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};
// src/services/apiService.js - Add these functions
export const resizeImage = async (fileId, width, height) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/resize-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileId, width, height }),
        });

        if (!response.ok) throw new Error('Resize failed');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const generateThumbnails = async (fileId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/generate-thumbnails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileId }),
        });

        if (!response.ok) throw new Error('Thumbnail generation failed');
        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const extractText = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)
    try {
        const response = await fetch(`${API_BASE_URL}/users/extract-text`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Text extraction failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('OCR error:', error);
        throw error;
    }
};
