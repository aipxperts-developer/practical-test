var express = require('express');
var router = express.Router();
var adminRoute = require("./admin/index");

router.use("/admin", adminRoute);

router.get('/', function (req, res, next) {
    res.json({"title": "Banking Transactions"})
});

module.exports = router;