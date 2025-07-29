// src/components/ui/FileUpload.jsx
import { useState } from 'react';
import { uploadFile } from '../../services/apiService';

function FileUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
    const [uploadedFile, setUploadedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileUpload = async (file) => {
        if (!file) return;

        setUploadStatus('uploading');
        setErrorMessage('');

        try {
            const result = await uploadFile(file);
            setUploadedFile(result);
            setUploadStatus('success');
            console.log('Upload successful:', result);
        } catch (error) {
            setUploadStatus('error');
            setErrorMessage(error.message || 'Upload failed. Please try again.');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const resetUpload = () => {
        setUploadStatus('idle');
        setUploadedFile(null);
        setErrorMessage('');
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 cursor-pointer
          ${isDragging
                        ? 'border-blue-500 bg-blue-50 scale-105'
                        : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                    }
          ${uploadStatus === 'uploading' ? 'pointer-events-none opacity-50' : ''}
        `}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => uploadStatus === 'idle' && document.getElementById('file-input').click()}
            >
                <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    onChange={handleFileInput}
                    accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.txt"
                />

                {uploadStatus === 'idle' && (
                    <>
                        <div className="text-6xl mb-4">📄</div>
                        <h3 className="text-xl text-gray-700 mb-2 font-medium">
                            {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
                        </h3>
                        <p className="text-gray-500 mb-4">or click to browse</p>
                        <p className="text-sm text-gray-400">
                            Supports: PDF, DOCX, DOC, JPG, PNG, TXT
                        </p>
                    </>
                )}

                {uploadStatus === 'uploading' && (
                    <>
                        <div className="text-5xl mb-4">⏳</div>
                        <h3 className="text-xl text-gray-700 mb-4">Uploading...</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div className="bg-blue-500 h-2 rounded-full animate-pulse w-full"></div>
                        </div>
                        <p className="text-sm text-gray-500">Please wait...</p>
                    </>
                )}

                {uploadStatus === 'success' && uploadedFile && (
                    <>
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="text-xl text-green-600 mb-2">Upload Successful!</h3>
                        <p className="text-gray-600 mb-4">
                            File: {uploadedFile.data?.originalName || 'File uploaded'}
                        </p>
                        <button
                            onClick={resetUpload}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors duration-300"
                        >
                            Upload Another File
                        </button>
                    </>
                )}

                {uploadStatus === 'error' && (
                    <>
                        <div className="text-5xl mb-4">❌</div>
                        <h3 className="text-xl text-red-600 mb-2">Upload Failed</h3>
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                        <button
                            onClick={resetUpload}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition-colors duration-300"
                        >
                            Try Again
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default FileUpload;
