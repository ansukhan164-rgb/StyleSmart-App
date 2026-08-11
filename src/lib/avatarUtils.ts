/**
 * Utility functions for User Avatar Management, Validation, and Compression
 */

export const DEFAULT_AVATAR_DATA_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160' fill='none'><rect width='160' height='160' rx='80' fill='%230a0f1d'/><circle cx='80' cy='80' r='72' stroke='%23d4af37' stroke-width='2.5' stroke-opacity='0.6'/><circle cx='80' cy='80' r='62' fill='%23131c31'/><path d='M55 72C55 58.745 65.745 48 79 48h2c13.255 0 24 10.745 24 24v4c0 13.255-10.745 24-24 24h-2c-13.255 0-24-10.745-24-24v-4z' fill='%231e293b' stroke='%236366f1' stroke-width='1.5'/><text x='80' y='72' font-family='serif' font-size='22' font-weight='bold' fill='%23d4af37' text-anchor='middle'>STYLE</text><text x='80' y='96' font-family='sans-serif' font-size='16' font-weight='bold' fill='%23ffffff' letter-spacing='3' text-anchor='middle'>SMART</text><circle cx='80' cy='118' r='3' fill='%23d4af37'/></svg>";

/**
 * Returns a valid avatar URL or the default fallback avatar Data URL
 */
export function getAvatarUrl(avatar?: string | null): string {
  if (avatar && avatar.trim().length > 0) {
    return avatar.trim();
  }
  return DEFAULT_AVATAR_DATA_URL;
}

/**
 * Validates file type and size for photo uploads
 */
export function validateAvatarFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  // Allowed MIME types
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const fileName = file.name.toLowerCase();
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

  const hasValidType = allowedTypes.includes(file.type);
  const hasValidExt = allowedExtensions.some(ext => fileName.endsWith(ext));

  if (!hasValidType && !hasValidExt) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload a JPG, JPEG, PNG, or WebP photo.'
    };
  }

  // Max size: 5MB
  const maxSizeBytes = 5 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeMB}MB) exceeds the 5MB limit. Please choose a smaller image.`
    };
  }

  return { valid: true };
}

/**
 * Reads, resizes, and compresses an image file to a lightweight JPEG Data URL
 */
export function compressAndResizeAvatar(
  file: File,
  maxDimension = 400,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read image file.'));
    };

    reader.onload = (e) => {
      const img = new Image();

      img.onerror = () => {
        reject(new Error('Failed to load image for processing.'));
      };

      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          // Scale dimensions proportionally
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context non-available'));
            return;
          }

          // Optional high quality smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Clear and draw image
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Export as JPEG Data URL
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (err) {
          reject(err);
        }
      };

      if (e.target?.result) {
        img.src = e.target.result as string;
      } else {
        reject(new Error('Empty file reader result'));
      }
    };

    reader.readAsDataURL(file);
  });
}
