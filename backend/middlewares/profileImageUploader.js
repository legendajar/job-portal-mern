// profileUploader.js
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'Job-Portal/profile',
            allowed_formats: ['jpg', 'jpeg', 'png'],
            public_id: `profile_${Date.now()}_${file.originalname}`
        };
    }
});

const profileUploader = multer({ storage: profileStorage }).single("file");

export default profileUploader;
