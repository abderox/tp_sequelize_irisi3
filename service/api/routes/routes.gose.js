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
    isAdmin
} = require("../middlewares/auth.gose");

router.post("/",[verifyToken,isAdmin], createBook);
router.get("/", getBooks);
router.get("/:id", getBook);
router.put("/:id",[verifyToken,isAdmin], updateBook);
router.delete("/:id",[verifyToken,isAdmin],deleteBook);
router.post("/upload",[verifyToken,isAdmin], uploadProfileImage);
router.post("/client/create", registerClient);
router.post("/order", createOrder);
router.get("/orders/all", getOrders);
router.put("/order/update/:id",[verifyToken,isAdmin], updateOrder);
router.put("/order/decline/:id",[verifyToken,isAdmin], declineOrder);
// router.put("/order/decline/:id", declineOrder);
// router.put("/order/update/:id", updateOrder);
router.get("/download/:cover", downloadCover);



module.exports = router;
