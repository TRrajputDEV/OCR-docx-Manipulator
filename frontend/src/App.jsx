// src/App.jsx
import { useState } from 'react';
import FileUpload from './components/ui/FileUpload';
import OCRExtract from './components/ui/OCRExtract';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('upload');

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return <FileUpload />;
      case 'ocr':
        return <OCRExtract />;
      default:
        return <FileUpload />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Simple Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📄</span>
              <h1 className="text-xl font-semibold text-gray-800">DocForge</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${activeTab === 'upload'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Image Processing
              </button>
              <button
                onClick={() => setActiveTab('ocr')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${activeTab === 'ocr'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                OCR Extract
              </button>
              <button
                className="px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
                disabled
              >
                Converter (Soon)
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
