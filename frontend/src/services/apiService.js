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
        return data;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};
