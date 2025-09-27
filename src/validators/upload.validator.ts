import { ValidationChain } from "express-validator";
import { Request } from "express";

class UploadValidator {
  // Validate file upload
  validateFile(): ValidationChain[] {
    return [
      // Custom validation for file upload
      {
        run: (req: Request) => {
          return new Promise((resolve, reject) => {
            if (!req.file) {
              reject(new Error("File is required"));
            } else {
              // Check file size (max 5MB)
              if (req.file.size > 5 * 1024 * 1024) {
                reject(new Error("File size must not exceed 5MB"));
              }

              // Check file type (images only)
              const allowedMimeTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/gif",
                "image/webp",
              ];

              if (!allowedMimeTypes.includes(req.file.mimetype)) {
                reject(
                  new Error("File must be an image (JPEG, PNG, GIF, or WebP)")
                );
              }

              resolve(true);
            }
          });
        },
      } as any,
    ];
  }
}

export default new UploadValidator();
