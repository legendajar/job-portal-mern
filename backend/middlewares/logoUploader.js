import multer from 'multer'
import cloudinary from '../utils/cloudinary.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'


const logoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'Job-Portal/company-logo',
            allowed_formats: ['jpg', 'jpeg', 'png'],
            public_id: file.original_name
        };
    }
});

const logoUploader = multer({ storage: logoStorage }).single("file");

export default logoUploader;