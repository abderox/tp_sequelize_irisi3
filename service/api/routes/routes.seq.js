const express = require("express");
const router = express.Router();

const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    uploadProfileImage,
    downloadCover,
    getAllGenres
} = require("../controllers/bookery.controller");


// const {
//     uploadProfileImage,
//     downloadCover
// } = require("../controllers")


// router.post("/upload", uploadProfileImage);
// router.get("/download/:cover", downloadCover);

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/upload", uploadProfileImage);
router.get("/download/:cover", downloadCover);
router.get("/genres", getAllGenres);


module.exports = router;
