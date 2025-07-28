function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-medium text-gray-100 tracking-wide">
              DOCUFORGE
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-light text-gray-300">
              <a href="#features" className="hover:text-blue-400 transition-colors duration-300">Features</a>
              <a href="#how-it-works" className="hover:text-blue-400 transition-colors duration-300">How It Works</a>
              <a href="#pricing" className="hover:text-blue-400 transition-colors duration-300">Pricing</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extralight text-gray-100 mb-6 tracking-tight leading-tight">
            Transform Your Documents<br />
            <span className="text-blue-400 font-light">Instantly</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Upload, convert, resize, and enhance documents with AI-powered OCR and smart processing. 
            Professional results in seconds, no signup required.
          </p>
          
          {/* File Upload Area */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="border-2 border-dashed border-gray-600 hover:border-blue-500 bg-gray-800 hover:bg-gray-750 rounded-lg p-12 transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-4">📄</div>
                <p className="text-gray-300 mb-2 font-medium">Drag & drop your files here</p>
                <p className="text-gray-500 text-sm">PDF, DOCX, JPG, PNG - Up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="space-x-6">
            <button className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              START PROCESSING FREE
            </button>
            <button className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-gray-100 px-8 py-4 font-medium tracking-wide transition-all duration-300">
              SEE HOW IT WORKS
            </button>
          </div>

          {/* Supported Formats */}
          <div className="flex justify-center items-center space-x-6 mt-12 text-gray-500">
            <span className="text-sm font-light">SUPPORTED:</span>
            <div className="flex space-x-4">
              <span className="bg-gray-800 px-3 py-1 rounded text-xs">PDF</span>
              <span className="bg-gray-800 px-3 py-1 rounded text-xs">DOCX</span>
              <span className="bg-gray-800 px-3 py-1 rounded text-xs">JPG</span>
              <span className="bg-gray-800 px-3 py-1 rounded text-xs">PNG</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-light text-center mb-16 text-gray-100 tracking-wide">
            POWERFUL FEATURES
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            <div className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-blue-500/50 p-8 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 mb-6 flex items-center justify-center">
                <span className="text-white text-lg">🔍</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-100 group-hover:text-blue-400 transition-colors duration-300">
                Smart OCR
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Extract text from scanned documents and images with 99% accuracy using advanced AI recognition.
              </p>
            </div>

            <div className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-emerald-500/50 p-8 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 mb-6 flex items-center justify-center">
                <span className="text-white text-lg">🔄</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-100 group-hover:text-emerald-400 transition-colors duration-300">
                Format Conversion
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Convert between PDF, Word, Excel, and image formats instantly with perfect formatting preservation.
              </p>
            </div>

            <div className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-purple-500/50 p-8 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 mb-6 flex items-center justify-center">
                <span className="text-white text-lg">🏷️</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-100 group-hover:text-purple-400 transition-colors duration-300">
                Watermark Tools
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Add professional watermarks or remove existing ones securely with precision control.
              </p>
            </div>

            <div className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-orange-500/50 p-8 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 mb-6 flex items-center justify-center">
                <span className="text-white text-lg">📏</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-100 group-hover:text-orange-400 transition-colors duration-300">
                Image Resizing
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Resize and compress images while maintaining optimal quality using smart algorithms.
              </p>
            </div>

            <div className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-cyan-500/50 p-8 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 mb-6 flex items-center justify-center">
                <span className="text-white text-lg">⚡</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">
                Batch Processing
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Handle multiple files at once to save time with intelligent queue management.
              </p>
            </div>

            <div className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-green-500/50 p-8 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 mb-6 flex items-center justify-center">
                <span className="text-white text-lg">🔒</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-100 group-hover:text-green-400 transition-colors duration-300">
                Privacy First
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Your files are processed securely and deleted automatically after processing completes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-light mb-16 text-gray-100 tracking-wide">
            HOW IT WORKS
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-100">Upload</h3>
              <p className="text-gray-400 font-light">
                Drag & drop or browse files (PDF, JPG, PNG, DOCX). No file size limits for premium users.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-100">Choose</h3>
              <p className="text-gray-400 font-light">
                Select your processing option: convert, resize, OCR, watermark, or combine multiple operations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-100">Download</h3>
              <p className="text-gray-400 font-light">
                Get your processed file instantly with a secure download link that expires automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Trial Section */}
      <section className="bg-gray-950 border-t border-gray-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-6 text-gray-100 tracking-wide">
            GET STARTED WITH 5 FREE PROCESSES
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400 font-light leading-relaxed">
            No signup required • Files deleted after processing • Secure encryption
          </p>
          
          <div className="max-w-md mx-auto mb-8">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter email for additional credits"
                className="flex-1 bg-gray-800 border border-gray-700 text-gray-100 px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors duration-300"
              />
              <button className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 font-medium transition-all duration-300">
                GET CREDITS
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <span>🔒</span>
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Instant Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🗑️</span>
              <span>Auto-Delete Files</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-light text-sm tracking-wide">
              © 2025 DocuForge. Files processed securely and deleted automatically.
            </p>
            <div className="text-gray-600 text-sm font-light">
              PRIVACY FIRST • SECURE • FAST
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
