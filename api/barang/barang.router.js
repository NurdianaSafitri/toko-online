const {
    controllerAddItem,
    controllerUpdateItem,
    controllerDeleteItem,
    controllerGetItem,
    controllerGetItemById
} = require("./barang.controller")

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/addItem", controllerAddItem)
router.patch("/updateItem", controllerUpdateItem)
router.delete("/", checkToken, controllerDeleteItem)
router.get("/", checkToken, controllerGetItem)
router.get("/", checkToken, controllerGetItemById)

module.exports = router;