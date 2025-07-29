import React, { useState } from 'react'

function FileUpload() {

    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState('idle');


    const handleFileUpload = async () => {
        // this should handle upload.
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file);
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer bg-gray-800 ${isDragging ? 'border-blue-500' : 'border-gray-600 hover:border-blue-500'
                }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => document.getElementById('fileInput').click()}
        >
            <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            {status === 'idle' && (
                <p className="text-gray-300">Drag & drop a file or click to browse</p>
            )}
            {status === 'uploading' && (
                <p className="text-gray-300">Uploading your file...</p>
            )}
            {status === 'success' && (
                <p className="text-green-400">File uploaded successfully!</p>
            )}
            {status === 'error' && (
                <p className="text-red-400">Upload failed. Please try again.</p>
            )}
        </div>
    )
}

export default FileUpload;