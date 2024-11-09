const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 3100;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("File type not allowed"));
    }
    cb(null, true);
  },
});

app.post("/upload", upload.single("file"),
  (req, res) => {
    if (req.file) {
      res.status(200).send("File upload success");
    } else {
      res.status(400).send("File upload failed");
    }
  });
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
