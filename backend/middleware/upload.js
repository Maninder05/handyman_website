import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define upload directories
const profileDir = path.join(__dirname, '../uploads/profiles');
const certDir = path.join(__dirname, '../uploads/certifications');

// Create directories if they don't exist
if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
  console.log(' Created profiles directory:', profileDir);
}

if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
  console.log(' Created certifications directory:', certDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profileImage") {
      cb(null, profileDir);
    } else if (file.fieldname === "certification") {
      cb(null, certDir);
    } else {
      cb(null, profileDir); // Default to profiles
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  }
});

// File filter to only allow images for profile pictures
const fileFilter = (req, file, cb) => {
  // For profile images, only allow image types
  if (file.fieldname === "profileImage") {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for profile pictures!'), false);
    }
  } else {
    // For certifications, allow images and PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed for certifications!'), false);
    }
  }
};

// Configure multer with limits
const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

export default upload;