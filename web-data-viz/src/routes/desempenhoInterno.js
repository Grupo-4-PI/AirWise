var express = require("express");
var router = express.Router();
var desempenhoInternoController = require("../controllers/desempenhoInternoController");

router.get("/DadosDesempenhoInterno", (req, res) => {
  desempenhoInternoController.getDesemprenhoInterno(req, res);
});

module.exports = router;