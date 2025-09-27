import { Router } from "express";
import upload from "../middleware/uploadHandler";
import { validate } from "../middleware/validator";
import UploadValidator from "../validators/upload.validator";

export const uploadRouter = Router();

uploadRouter.post(
  "/",
  upload.single("file"),
  validate(UploadValidator.validateFile()),
  (req, res) => {
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });
  }
);

export default uploadRouter;
