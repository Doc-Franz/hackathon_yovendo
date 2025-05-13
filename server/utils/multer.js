const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// configurazione della cartella di storage su cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'organization_docs',
    resource_type: 'raw',
    access_mode: 'public',
  },
});

const upload = multer({ storage });

module.exports = upload;
