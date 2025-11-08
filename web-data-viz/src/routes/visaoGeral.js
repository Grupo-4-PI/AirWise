var express = require("express");
var router = express.Router();
var visaoGeralController = require("../controllers/visaoGeralController");

router.get("/dadosDashVisaoGeral", (req, res) => {
  visaoGeralController.getDataVisaoGeral(req, res);
});

module.exports = router;