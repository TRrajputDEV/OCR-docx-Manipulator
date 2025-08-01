# DocuForge - Document Processing Tool

A modern web application for document processing with image manipulation and OCR text extraction capabilities. Built with the MERN stack.

## ✨ Features

- **Image Upload & Processing** - Drag-and-drop or browse to upload images
- **Image Resizing** - Resize images to specific dimensions (300x300px)
- **Thumbnail Generation** - Create multiple thumbnail sizes
- **OCR Text Extraction** - Extract text from images using Tesseract.js
- **Real-time Processing** - Live progress indicators and status updates

## 🛠️ Tech Stack

**Frontend**
- React with Vite
- Tailwind CSS
- Modern JavaScript (ES6+)

**Backend**
- Node.js with Express.js
- Multer for file uploads
- Sharp for image processing
- Tesseract.js for OCR
- MongoDB for data storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (v5+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TRrajputDEV/OCR-docx-Manipulator.git
   cd OCR-docx-Manipulator
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/docuforge
   NODE_ENV=development
   ```

5. **Start the Application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## 📱 Usage

### Image Processing
1. Navigate to the "Image Processing" tab
2. Upload an image file (JPG, PNG, etc.)
3. Choose your processing option:
   - **Resize**: Creates a 300x300px version
   - **Generate Thumbnails**: Creates multiple sizes
4. Download your processed files

### OCR Text Extraction
1. Navigate to the "OCR Extract" tab
2. Upload an image containing text
3. Click "Extract Text"
4. Copy or download the extracted text

## 📸 Screenshots

<!-- Add your screenshots here -->
<img width="1902" height="971" alt="Screenshot 2025-08-01 233229" src="https://github.com/user-attachments/assets/85d65d6b-fd8b-4bb6-bd66-95fee660b1bc" />
<img width="1899" height="1079" alt="Screenshot 2025-08-01 233309" src="https://github.com/user-attachments/assets/a1d4ccda-864f-4e4d-b003-53de3f822180" />
<img width="1903" height="1079" alt="Screenshot 2025-08-01 233326" src="https://github.com/user-attachments/assets/d8a63a02-3202-4317-87da-41e2aeb8fbfe" />


## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users/uploadfile` | Upload a file |
| POST | `/api/v1/users/resize-image` | Resize an image |
| POST | `/api/v1/users/generate-thumbnails` | Generate thumbnails |
| POST | `/api/v1/users/extract-text` | Extract text via OCR |
| GET | `/api/v1/users/download/:filename` | Download processed file |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues, please check the console logs and ensure:
- All dependencies are installed correctly
- MongoDB is running
- Environment variables are set properly

---

**Repository**: [OCR-docx-Manipulator](https://github.com/TRrajputDEV/OCR-docx-Manipulator)

Built with ❤️ using the MERN stack.
