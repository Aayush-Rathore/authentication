import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, "./public");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    const uniqueName: string = String(
      Date.now() + Math.round(Math.random() * 10)
    );
    cb(null, uniqueName + "_" + file.originalname); // Changed * to _ to avoid confusion with file extension
  },
});

const fileFilter = function (req: Request, file: Express.Multer.File, cb: any) {
  // Check file type
  if (
    !file.mimetype.startsWith("image/") || // Check if file is not an image
    file.mimetype === "audio/mp3" ||
    file.mimetype === "video/mp4" // Check if file is mp3 or mp4
  ) {
    return cb(new Error("Only images are allowed"));
  }

  // Check file size
  if (file.size > 2 * 1024 * 1024) {
    return cb(new Error("File size should be less than 2MB"));
  }

  cb(null, true);
};

export const fileUpload = multer({ storage, fileFilter });
