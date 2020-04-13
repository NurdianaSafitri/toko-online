const {
    controllerCekBarang,
    controllerPesanBarang
} = require('./transaksi.controller');
const {checkToken} = require("../../auth/token_validation")
const router = require('express').Router();

router.get('/', checkToken, controllerCekBarang)
router.post('/pesan', checkToken, controllerPesanBarang)

module.exports = router