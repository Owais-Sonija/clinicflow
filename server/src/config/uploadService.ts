// server/src/services/uploadService.ts

import cloudinary from '../config/cloudinary';
import { Readable } from 'stream';
import { UploadResult } from '../types';

// ============ UPLOAD FUNCTIONS ============

/**
 * Upload file to Cloudinary
 */
export const uploadToCloudinary = (
    buffer: Buffer,
    folder: string,
    resourceType: 'image' | 'raw' = 'raw'
): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: `clinicflow/${folder}`,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else if (result) {
                    resolve({
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                        format: result.format,
                        bytes: result.bytes,
                    });
                }
            }
        );

        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
};

/**
 * Delete file from Cloudinary
 */
export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
    try {
        await cloudinary.uploader.destroy(publicId);
        return true;
    } catch (error) {
        console.error('Failed to delete from Cloudinary:', error);
        return false;
    }
};