var express = require("express");
var router = express.Router();
const emailCtrl = require("../controller/emailCtrl");

router.post("/*", emailCtrl.create);

module.exports = router;
