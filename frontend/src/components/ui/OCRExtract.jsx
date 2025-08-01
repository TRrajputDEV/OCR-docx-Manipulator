// src/components/ui/OCRExtract.jsx
import { useState } from 'react';
import { extractText } from '../../services/apiService';

// Supported image formats for OCR
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp'];

function OCRExtract() {
    const [file, setFile] = useState(null);
    const [extracting, setExtracting] = useState(false);
    const [extractedText, setExtractedText] = useState('');
    const [error, setError] = useState('');

    const validateFileType = (file) => {
        const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
        return SUPPORTED_FORMATS.includes(fileExtension);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (validateFileType(selectedFile)) {
                setFile(selectedFile);
                setExtractedText('');
                setError('');
            } else {
                setError(`Unsupported file type. Please select one of: ${SUPPORTED_FORMATS.join(', ')}`);
            }
        }
    };

    const handleExtractText = async () => {
        if (!file) return;

        setExtracting(true);
        setError('');

        try {
            const result = await extractText(file);
            setExtractedText(result.data.text);
        } catch (err) {
            setError(err.message || 'Text extraction failed');
        } finally {
            setExtracting(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(extractedText);
            alert('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text:', err);
            alert('Failed to copy text to clipboard');
        }
    };

    const downloadText = () => {
        const blob = new Blob([extractedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extracted_text_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const resetForm = () => {
        setFile(null);
        setExtractedText('');
        setError('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">OCR Text Extraction</h1>
                <p className="text-gray-600">
                    Extract text from images using advanced OCR technology
                </p>
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                        type="file"
                        id="ocr-file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.bmp,.tiff,.webp"
                        onChange={handleFileChange}
                    />

                    {!file ? (
                        <div>
                            <div className="text-4xl mb-4">🔍</div>
                            <label
                                htmlFor="ocr-file"
                                className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Click to select an image file
                            </label>
                            <p className="text-gray-500 text-sm mt-2">
                                Supports: JPG, JPEG, PNG, BMP, TIFF, WEBP
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="text-3xl">📄</div>
                            <p className="text-gray-700 font-medium">{file.name}</p>
                            <p className="text-gray-500 text-sm">
                                Size: {Math.round(file.size / 1024)} KB
                            </p>
                            <div className="flex space-x-3 justify-center">
                                <button
                                    onClick={handleExtractText}
                                    disabled={extracting}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    {extracting ? 'Extracting...' : 'Extract Text'}
                                </button>
                                <button
                                    onClick={() => {
                                        setFile(null);
                                        setExtractedText('');
                                        setError('');
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {extracting && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-gray-700">Processing your document...</span>
                    </div>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-red-600">❌</span>
                        <span className="text-red-800 font-medium">Error:</span>
                        <span className="text-red-700">{error}</span>
                    </div>
                </div>
            )}

            {/* Extracted Text Display */}
            {extractedText && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Extracted Text</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={copyToClipboard}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                                Copy Text
                            </button>
                            <button
                                onClick={downloadText}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                                Download
                            </button>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                            {extractedText}
                        </pre>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                        Characters: {extractedText.length} | Words: {extractedText.split(/\s+/).length}
                    </div>
                </div>
            )}
        </div>
    );
}

export default OCRExtract;
