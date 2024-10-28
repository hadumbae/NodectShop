import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/avif') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

export const upload = multer({ storage, fileFilter });
