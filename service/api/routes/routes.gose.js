const express = require("express");
const router = express.Router();

const {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    registerClient,
    createOrder,
    getOrders,
    updateOrder,
    declineOrder,
    uploadProfileImage,
    downloadCover,
}
    = require("../controllers/bookery.gose");

// import middlewares
const { 
    verifyToken,
    isAdmin,
    isBuyer 
} = require("../middlewares/auth");

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/upload", uploadProfileImage);
router.post("/client/create", registerClient);
router.post("/order", createOrder);
router.get("/orders/all", getOrders);
router.put("/order/update/:id", updateOrder);
router.put("/order/decline/:id", declineOrder);
router.put("/order/decline/:id", declineOrder);
router.put("/order/update/:id", updateOrder);
router.get("/download/:cover", downloadCover);



module.exports = router;
