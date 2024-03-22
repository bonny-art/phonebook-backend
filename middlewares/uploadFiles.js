import multer from "multer";
import * as path from "node:path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(process.cwd(), "tmp"));
  },
});

export default multer({ storage });
