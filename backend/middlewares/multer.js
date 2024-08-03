import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import {CloudinaryStorage} from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'Job-Portal/resume',
            allowedFormats:['pdf', 'doc', 'docx'],
            public_id: file.originalname
        }
    }
});
const singleUpload = multer({ storage }).single("file");

export default singleUpload;
