import { v2 as cloudinary } from 'cloudinary';

export const CLOUDINARY_API_SECRET_KEY = 'ACN2HQ3YIsOr6tJU13arTq3QcGo';
export const CLOUDINARY_API_KEY = '327721534718349';

cloudinary.config({
  cloud_name: 'dcpudzejv',
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET_KEY,
});

/**
 * This is the configuration of filestorage which uses cloudinary
 * @param {*} filePath string of file path
 * @returns
 */
const urlUpload = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export default urlUpload;
