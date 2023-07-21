const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

exports.formReader = multer();

exports.uploadImg = async (mimetype, buffer, picname, username) => {
  return await cloudinary.uploader.upload(
    `data:${mimetype};base64,` + buffer.toString("base64"),
    { public_id: picname, folder: username },
    (error, result) => {
      if (error)
        throw { status: 403, message: "Error uploading the buffer file" };
      return result;
    }
  );
};
