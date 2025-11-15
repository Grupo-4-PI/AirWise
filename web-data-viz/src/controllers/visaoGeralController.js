var visaoGeralModel = require("../models/visaoGeralModel");

function getDataVisaoGeral(req, res) {
  var nomeDaEmpresa = req.query.nomeEmpresaServer;

  if (!nomeDaEmpresa) {
    return res.status(400).send("Nome da Empresa desconhecido");
  }

  // Chamadas separadas, todas independentes
  const chamadaKPI = visaoGeralModel
    .getDataKPIsVisaoGeral(nomeDaEmpresa)
    .catch((erro) => {
      console.log("Erro KPI:", erro);
      return null;
    });

  const chamadaGrafico1 = visaoGeralModel
    .graficoNotaMediaVisaoGeral(nomeDaEmpresa)
    .catch((erro) => {
      console.log("Erro Grafico 1:", erro);
      return null;
    });

  const chamadaGrafico2 = visaoGeralModel
    .graficoEstadoNotaMedia(nomeDaEmpresa)
    .catch((erro) => {
      console.log("Erro Grafico 2:", erro);
      return null;
    });

  // Agora junta todas as respostas
  Promise.all([chamadaKPI, chamadaGrafico1, chamadaGrafico2])
    .then(([resultadoKPI, resultadoGrafico1, resultadoGrafico2]) => {
      res.json({
        kpis: resultadoKPI,
        grafico1: resultadoGrafico1,
        grafico2: resultadoGrafico2,
      });
    })
    .catch((erro) => {
      console.log("Erro final:", erro);
      res.status(500).json("Erro inesperado ao processar dados");
    });
}

module.exports = {
  getDataVisaoGeral,
};