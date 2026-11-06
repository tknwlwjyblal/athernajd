/**
 * Client-side image compressor utility
 * Resizes images from camera / gallery to fit efficiently within Firestore limits
 * while maintaining crisp 4K-like interior design visual quality.
 */

export interface CompressedImageResult {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
  fileName: string;
}

export async function compressImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.82
): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    // Basic file type check
    if (!file.type.startsWith('image/')) {
      reject(new Error('الملف المختار ليس صورة صالحة'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('فشل قراءة ملف الصورة'));
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = () => reject(new Error('فشل تحميل الصورة في المتصفح'));
      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect-ratio preserved scaling
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('فشل تهيئة معالج الصور في المتصفح'));
          return;
        }

        // Use high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized JPEG data URI
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

        // Estimate size in bytes from base64 string
        const base64Length = compressedDataUrl.length - (compressedDataUrl.indexOf(',') + 1);
        const compressedSizeBytes = Math.round((base64Length * 3) / 4);

        resolve({
          dataUrl: compressedDataUrl,
          originalSize: file.size,
          compressedSize: compressedSizeBytes,
          width,
          height,
          fileName: file.name,
        });
      };

      if (readerEvent.target?.result) {
        img.src = readerEvent.target.result as string;
      } else {
        reject(new Error('فشل استخراج بيانات الصورة'));
      }
    };

    reader.readAsDataURL(file);
  });
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
