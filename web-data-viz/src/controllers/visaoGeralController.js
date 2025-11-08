var visaoGeralModel = require("../models/visaoGeralModel");

function getDataVisaoGeral(req, res) {
  var nomeDaEmpresa = req.query.nomeEmpresaServer;

  if (nomeDaEmpresa == undefined) {
    res.status(400).send("Nome da Empresa desconhecido");
  } else {
    visaoGeralModel
      .getDataKPIsVisaoGeral(nomeDaEmpresa)
      .then(function (resultadoKPI) {
        visaoGeralModel
          .graficoNotaMediaVisaoGeral(nomeDaEmpresa)
          .then((resultadoGrafico1) => {
            visaoGeralModel
              .graficoEstadoNotaMedia(nomeDaEmpresa)
              .then((resultadoGrafico2) => {
                res.json({
                  kpis: resultadoKPI,
                  grafico1: resultadoGrafico1,
                  grafico2: resultadoGrafico2,
                });
              });
          });
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nNão foi possivel encontrar os dados: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  getDataVisaoGeral,
};
