import multer from 'multer';
import path from 'path'; // Import path for path operations\

// Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join('test', '../config/images')); // Use path.join for safer path handling
//     // cb(null, path.join('test', {}));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

const storage = multer.diskStorage({});

const upload = multer({ storage });

export default upload;
