const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart.controller");

router.post("/", cartController.createCart);
router.get("/", cartController.getAllCartItems);
router.get("/:email", cartController.getCartItemByEmail);
router.put("/:id", cartController.updateCartItem);
router.delete("/:id", cartController.deleteCartItemById);
router.delete("/clear/:email", cartController.clearAllItem)


module.exports = router;