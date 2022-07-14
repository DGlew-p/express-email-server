var express = require("express");
var router = express.Router();
const emailCtrl = require("../controller/emailCtrl");

router.post("/*", emailCtrl.create, console.log("routejs"));

module.exports = router;
