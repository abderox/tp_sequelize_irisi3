const express = require("express");
const router = express.Router();

const {
    getAll,
    create,
    updateById,
    findById,
    remove,
    removeAll,
    uploadProfileImage,
    downloadCover
} = require("../controllers");






// router.get("/", getAll);
// router.post("/", create);
// router.put("/:id", updateById);
// router.get("/:id", findById);
// router.delete("/:id", remove);
// router.delete("/", removeAll);
router.post("/upload", uploadProfileImage);
router.get("/download/:cover", downloadCover);






module.exports = router;