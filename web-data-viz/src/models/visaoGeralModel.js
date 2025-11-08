var database = require("../database/config");

function getDataKPIsVisaoGeral(nomeEmpresa) {
  var instrucaoSql = `SELECT
    COUNT(*) AS total_reclamacoes,
    SUM(CASE WHEN respondida = 'Sim' THEN 1 ELSE 0 END) AS total_respondidas,
    ROUND(AVG(tempo_resposta), 2) AS media_tempo_resposta,
    ROUND(AVG(nota_consumidor), 2) AS media_nota_consumidor
    FROM reclamacoes r
    JOIN empresa e ON r.fkEmpresa = e.idEmpresa
    WHERE e.nomeFantasia = '${nomeEmpresa}'
    AND DATE_FORMAT(r.data_abertura, '%Y-%m') = '2025-03';`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function graficoNotaMediaVisaoGeral(nomeEmpresa) {
  var instrucaoSql = `SELECT 
    DATE_FORMAT(r.data_abertura, '%Y-%m') AS mes_ano,
    ROUND(AVG(r.nota_consumidor), 2) AS media_nota
FROM reclamacoes r
JOIN empresa e ON e.idEmpresa = r.fkEmpresa
WHERE e.nomeFantasia = '${nomeEmpresa}'
GROUP BY mes_ano
ORDER BY mes_ano;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function graficoEstadoNotaMedia(nomeEmpresa) {
  var instrucaoSql = `SELECT
    uf,
    COUNT(*) AS total,
    ROUND(AVG(nota_consumidor), 2) AS media_nota
FROM reclamacoes r
JOIN empresa e ON r.fkEmpresa = e.idEmpresa
WHERE e.nomeFantasia = '${nomeEmpresa}'
  AND DATE_FORMAT(r.data_abertura, '%Y-%m') = '2025-03'
GROUP BY uf
ORDER BY total DESC
LIMIT 5;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  getDataKPIsVisaoGeral,
  graficoNotaMediaVisaoGeral,
  graficoEstadoNotaMedia
};
