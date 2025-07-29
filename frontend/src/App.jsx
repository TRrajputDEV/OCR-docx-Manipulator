// src/App.jsx
import FileUpload from './components/ui/FileUpload'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Document Upload Tool
        </h1>
        <FileUpload />
      </div>
    </div>
  )
}

export default App
