import multer from 'multer';

const storage = multer.memoryStorage();

// Update the `singleUpload` to handle both room image and aadhaar file
export const singleUpload = multer({ storage }).fields([
    { name: 'file', maxCount: 1 },  // Profile photo
    { name: 'roomImage', maxCount: 1 },   // Room image
    { name: 'aadhaarFile', maxCount: 1 }  // Aadhaar file 
]);
