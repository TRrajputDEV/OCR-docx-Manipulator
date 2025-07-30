import sharp from 'sharp';
class ImageService {
    // Image resizer
    static async resizeImage(
        inputPath,
        outputPath,
        width,
        height,
        quality = 80
    ) {

        try {
            await sharp(inputPath)
                .resize(width, height, {
                    fit: 'inside', 
                    withoutEnlargement: true
                })
                .jpeg({ quality })
                .toFile(outputPath);

            return {
                success: true,
                outputPath,
                dimensions: { width, height }
            };

        } catch (error) {
            throw new Error(`image resize failed: ${error.message}`);
        }

    }
    // Get image metadata
    static async getImageInfo(imagePath) {
        try {
            const metadata = await sharp(imagePath).metadata();
            return {
                width: metadata.width,
                height: metadata.height,
                format: metadata.format,
                size: metadata.size
            };
        } catch (error) {
            throw new Error(`Failed to get Image info: ${error.message}`)
        }
    }
    // Generate multiple Sizes(thumbnail, medium Large)
    static async generateMultipleSizes(inputPath, baseOutputPath) {
        const sizes = [
            { name: 'thumbnail', width: 150, height: 150 },
            { name: 'medium', width: 500, height: 500 },
            { name: 'large', width: 1200, height: 1200 }
        ];
        const result = [];

        for(const size of sizes){
            const outputPath = `${baseOutputPath}_${size.name}.jpg`;
            const resizeResult = await this.resizeImage(inputPath, outputPath, size.width, size.height);

            result.push({
                size: size.name,
                outputPath,
                dimensions: resizeResult.dimensions
            });
        }

        return result;
    }
}
export default ImageService;
