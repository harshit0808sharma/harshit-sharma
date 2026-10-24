import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_API_KEY) {
  try {
    process.loadEnvFile?.('.env.local');
  } catch {
    // ignore
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;

export async function uploadToCloudinary(fileBuffer: Buffer, folder: string = 'portfolio'): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: 'auto' }, (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary upload returned empty result'));
        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
}
