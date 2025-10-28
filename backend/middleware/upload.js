import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload folders if they don’t exist
const profileDir = "uploads/profiles";
const certDir = "uploads/certifications";

if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });
if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });

// STORAGE SETTINGS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profileImage") {
      cb(null, profileDir);
    } else {
      cb(null, certDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;
