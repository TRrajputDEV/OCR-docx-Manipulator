// src/components/ui/FileUpload.jsx
import { useState } from 'react';
import { uploadFile, resizeImage, generateThumbnails } from '../../services/apiService';

// Supported file formats for upload
const SUPPORTED_FORMATS = ['.pdf', '.docx', '.doc', '.jpg', '.jpeg', '.png', '.txt'];
const IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

function FileUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [processedFiles, setProcessedFiles] = useState([]);
    const [processingStatus, setProcessingStatus] = useState('idle');
    const [processingError, setProcessingError] = useState('');

    const isImageFile = (filename) => {
        if (!filename) return false;
        const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
        return IMAGE_FORMATS.includes(fileExtension);
    };

    const handleFileUpload = async (file) => {
        if (!file) return;

        setUploadStatus('uploading');
        setErrorMessage('');
        resetProcessingState();

        try {
            const result = await uploadFile(file);
            setUploadedFile(result.data);
            setUploadStatus('success');
        } catch (error) {
            setUploadStatus('error');
            setErrorMessage(error.message || 'Upload failed. Please try again.');
        }
    };

    const resetProcessingState = () => {
        setProcessedFiles([]);
        setProcessingStatus('idle');
        setProcessingError('');
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

    const handleResize = async () => {
        if (!uploadedFile?.filename) return;

        setProcessingStatus('processing');
        setProcessingError('');
        setProcessedFiles([]);

        try {
            const result = await resizeImage(uploadedFile.filename, 300, 300);
            setProcessedFiles([result.data]);
            setProcessingStatus('success');
        } catch (error) {
            setProcessingStatus('error');
            setProcessingError(error.message || 'Resize failed. Please try again.');
            console.error('Resize failed:', error);
        }
    };

    const handleGenerateThumbnails = async () => {
        if (!uploadedFile?.filename) return;

        setProcessingStatus('processing');
        setProcessingError('');
        setProcessedFiles([]);

        try {
            const result = await generateThumbnails(uploadedFile.filename);
            setProcessedFiles(result.data.processedFiles);
            setProcessingStatus('success');
        } catch (error) {
            setProcessingStatus('error');
            setProcessingError(error.message || 'Thumbnail generation failed. Please try again.');
            console.error('Thumbnail generation failed:', error);
        }
    };

    const resetUpload = () => {
        setUploadStatus('idle');
        setUploadedFile(null);
        setErrorMessage('');
        setProcessedFiles([]);
        setProcessingStatus('idle');
        setProcessingError('');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
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
                            File: {uploadedFile.originalName || 'File uploaded'}
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

            {/* Processing Options Section */}
            {uploadStatus === 'success' && uploadedFile && (
                <div className="mt-8 p-6 bg-white border rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">🔧</span>
                        Processing Options
                    </h3>

                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">File:</span> {uploadedFile.originalName}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Size:</span> {uploadedFile.size ? Math.round(uploadedFile.size / 1024) : 'Unknown'} KB
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Type:</span> {uploadedFile.mimetype}
                        </p>
                    </div>

                    {/* Show processing options only for images */}
                    {isImageFile(uploadedFile.originalName) ? (
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-700 mb-3">Image Processing Options:</h4>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={handleResize}
                                        disabled={processingStatus === 'processing'}
                                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition-colors duration-300 flex items-center space-x-2"
                                    >
                                        <span>📏</span>
                                        <span>Resize to 300x300</span>
                                    </button>
                                    <button
                                        onClick={handleGenerateThumbnails}
                                        disabled={processingStatus === 'processing'}
                                        className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition-colors duration-300 flex items-center space-x-2"
                                    >
                                        <span>🖼️</span>
                                        <span>Generate Thumbnails</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>🚧 Processing options for this file type coming soon!</p>
                            <p className="text-sm mt-2">Currently supporting image processing (JPG, PNG, etc.)</p>
                        </div>
                    )}

                    {/* Processing Status */}
                    {processingStatus === 'processing' && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center space-x-3">
                                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                <span className="text-blue-700 font-medium">Processing your file...</span>
                            </div>
                            <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full animate-pulse w-full"></div>
                            </div>
                        </div>
                    )}

                    {/* Processing Error */}
                    {processingStatus === 'error' && (
                        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center space-x-2 text-red-700">
                                <span>❌</span>
                                <span className="font-medium">Processing Failed</span>
                            </div>
                            <p className="text-red-600 mt-1 text-sm">{processingError}</p>
                        </div>
                    )}

                    {/* Processed Files */}
                    {processingStatus === 'success' && processedFiles.length > 0 && (
                        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center space-x-2 text-green-700 mb-3">
                                <span>✅</span>
                                <span className="font-medium">Processing Complete!</span>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-700">Download Your Processed Files:</h4>

                                {/* Single processed file (resize) */}
                                {processedFiles.length === 1 && processedFiles[0].processedFile && (
                                    <div className="flex justify-between items-center bg-white p-3 rounded border">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">Resized Image</p>
                                            <p className="text-sm text-gray-600">
                                                {processedFiles[0].dimensions?.width}x{processedFiles[0].dimensions?.height} pixels
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Size: {processedFiles[0].newSize ? Math.round(processedFiles[0].newSize / 1024) : 'Unknown'} KB
                                                {processedFiles[0].originalSize && ` (was ${Math.round(processedFiles[0].originalSize / 1024)} KB)`}
                                            </p>
                                        </div>
                                        <a
                                            href={`http://localhost:4000${processedFiles[0].downloadUrl}`}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors duration-300 flex items-center space-x-2"
                                            download
                                        >
                                            <span>⬇️</span>
                                            <span>Download</span>
                                        </a>
                                    </div>
                                )}

                                {/* Multiple processed files (thumbnails) */}
                                {processedFiles.length > 1 && (
                                    <div className="grid gap-3">
                                        {processedFiles.map((file, index) => (
                                            <div key={index} className="flex justify-between items-center bg-white p-3 rounded border">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800 capitalize">
                                                        {file.size} Thumbnail
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {file.dimensions?.width}x{file.dimensions?.height} pixels
                                                    </p>
                                                </div>
                                                <a
                                                    href={`http://localhost:4000${file.downloadUrl}`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors duration-300 flex items-center space-x-2"
                                                    download
                                                >
                                                    <span>⬇️</span>
                                                    <span>Download</span>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FileUpload;
