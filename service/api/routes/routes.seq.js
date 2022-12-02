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
    getAllGenres,
    createOrder,
    getAllOrders,
    createClient,
    remmoveOrder,
    declineOrder,
    updateOrder
} = require("../controllers/bookery.controller");

// import middlewares
const { 
    verifyToken,
    isAdmin,
    isBuyer 
} = require("../middlewares/auth");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", [verifyToken,isAdmin],createBook);
router.put("/:id",[verifyToken,isAdmin], updateBook);
router.delete("/:id",[verifyToken,isAdmin], deleteBook);
router.post("/upload",[verifyToken,isAdmin], uploadProfileImage);
router.get("/download/:cover", downloadCover);
router.get("/genres", getAllGenres);
router.post("/order", createOrder);
router.get("/orders/all",[verifyToken,isAdmin], getAllOrders);
router.post("/client/create", createClient);
router.delete("/order/delete/:id",[verifyToken,isAdmin], remmoveOrder);
router.put("/order/decline/:id", declineOrder);
router.put("/order/update/:id", updateOrder);


module.exports = router;
