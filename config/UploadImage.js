import multer from "multer";
import fs from "fs";
import path from "path";

// Konfigurasi Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images/"); // Folder tujuan penyimpanan
//   },
//   filename: function (req, file, cb) {
//     // Normalisasi nama file
//     const uniqueName = file.originalname.replace(/\s+/g, "_").toLowerCase(); // Ganti spasi dengan "_"
//     cb(null, Date.now() + "_" + uniqueName);
//   },
// });
const storage = multer.memoryStorage();

export const upload = multer({ storage });

export const DeleteImage = (filenames) => {
  if (!Array.isArray(filenames)) {
    filenames = [filenames];
  }
  filenames.forEach((filename) => {
    if (fs.existsSync(`public/images/${filename}`)) {
      fs.unlink(`public/images/${filename}`, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted:", `public/images/${filename}`);
        }
      });
    } else {
      console.log("File not found:", `public/images/${filename}`);
    }
  });
};

export const saveFiles = async (files, folder = "public/images/") => {
  const savedFilenames = [];

  for (const file of files) {
    const uniqueName =
      Date.now() + "_" + file.originalname.replace(/\s+/g, "_").toLowerCase();
    const filePath = path.join(folder, uniqueName);

    // Pastikan folder ada (optional, kalau perlu)
    fs.mkdirSync(folder, { recursive: true });

    // Simpan file
    await fs.promises.writeFile(filePath, file.buffer);

    savedFilenames.push(uniqueName);
  }
  console.log("object", savedFilenames);
  return savedFilenames; // return array nama file yang disimpan
};
