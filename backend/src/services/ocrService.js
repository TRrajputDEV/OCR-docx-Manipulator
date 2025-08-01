// OCR Service - Image Text Extraction
import Tesseract from 'tesseract.js';

class OCRService {
    /**
     * Extract text from image files using Tesseract OCR
     * @param {string} imagePath - Path to the image file
     * @returns {Promise<Object>} Object containing extracted text and metadata
     */
    static async extractTextFromImage(imagePath) {
        try {
            console.log('Starting OCR processing for image:', imagePath);
            
            const { data: { text, confidence } } = await Tesseract.recognize(imagePath, 'eng', {
                logger: (info) => {
                    if (info.status === 'recognizing text') {
                        console.log(`OCR Progress: ${Math.round(info.progress * 100)}%`);
                    }
                }
            });
            
            const extractedText = text.trim();
            console.log('OCR completed. Text length:', extractedText.length);
            
            if (extractedText.length === 0) {
                throw new Error('No text could be extracted from the image');
            }
            
            return {
                success: true,
                text: extractedText,
                confidence: Math.round(confidence),
                wordCount: extractedText.split(/\s+/).filter(word => word.length > 0).length,
                characterCount: extractedText.length
            };
            
        } catch (error) {
            console.error('OCR processing failed:', error.message);
            throw new Error(`Image OCR processing failed: ${error.message}`);
        }
    }
}

export default OCRService;
