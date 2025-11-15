var database = require("../database/config");

function getPanoramaKPI( mes, ano) {
  var instrucaoSql = `SELECT 
    e.idEmpresa,
    e.nomeFantasia,
    MONTH(r.data_abertura) AS mes,
    YEAR(r.data_abertura) AS ano,
    ROUND(AVG(r.nota_consumidor), 2) AS mediaNota
FROM empresa e
JOIN reclamacoes r ON r.fkEmpresa = e.idEmpresa
WHERE MONTH(r.data_abertura) = ${mes}
  AND YEAR(r.data_abertura) = ${ano}
GROUP BY 
    e.idEmpresa, 
    e.nomeFantasia, 
    MONTH(r.data_abertura),
    YEAR(r.data_abertura)
ORDER BY mediaNota DESC
LIMIT 3;
`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getNotaMedia( idEmpresa, mes, ano) {
  var instrucaoSql = `SELECT 
    TRUNCATE(AVG(CASE WHEN fkEmpresa = ${idEmpresa} THEN nota_consumidor END), 2) AS media_empresa,
    TRUNCATE(AVG(CASE WHEN fkEmpresa <> ${idEmpresa} THEN nota_consumidor END), 2) AS media_mercado,
    TRUNCATE(
        AVG(CASE WHEN fkEmpresa = ${idEmpresa} THEN nota_consumidor END) -
        AVG(CASE WHEN fkEmpresa <> ${idEmpresa} THEN nota_consumidor END)
    , 2) AS variacao,
    TRUNCATE(
        ABS(
            AVG(CASE WHEN fkEmpresa = ${idEmpresa} THEN nota_consumidor END) -
            AVG(CASE WHEN fkEmpresa <> ${idEmpresa} THEN nota_consumidor END)
        )
    , 2) AS delta
FROM reclamacoes
WHERE MONTH(data_abertura) = ${mes}
  AND YEAR(data_abertura) = ${ano};`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function getRankingEmpresa(idEmpresa) {
  var instrucaoSql = `SELECT 
    idEmpresa,
    nomeFantasia,
    mes,
    ano,
    posicao
FROM (
    SELECT 
        idEmpresa,
        nomeFantasia,
        mes,
        ano,
        mediaNota,
        RANK() OVER (PARTITION BY ano, mes ORDER BY mediaNota DESC) AS posicao
    FROM (
        SELECT 
            e.idEmpresa,
            e.nomeFantasia,
            MONTH(r.data_abertura) AS mes,
            YEAR(r.data_abertura) AS ano,
            ROUND(AVG(r.nota_consumidor), 2) AS mediaNota
        FROM empresa e
        JOIN reclamacoes r ON r.fkEmpresa = e.idEmpresa
        GROUP BY 
            e.idEmpresa, 
            e.nomeFantasia,
            MONTH(r.data_abertura),
            YEAR(r.data_abertura)
    ) AS medias
) AS ranking
WHERE idEmpresa = ${idEmpresa};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getGraficoMapaDeltaMercado(idEmpresa, mes, ano) {
  var instrucaoSql = `SELECT 
    r.uf,
    
    -- Média da sua empresa
    TRUNCATE(AVG(CASE WHEN r.fkEmpresa = 1 THEN r.nota_consumidor END), 2) 
        AS media_empresa,
    
    -- Média do mercado (todas as outras)
    TRUNCATE(AVG(CASE WHEN r.fkEmpresa <> ${idEmpresa} THEN r.nota_consumidor END), 2) 
        AS media_mercado,

    -- Diferença direta
    TRUNCATE(
        AVG(CASE WHEN r.fkEmpresa = ${idEmpresa} THEN r.nota_consumidor END)
        -
        AVG(CASE WHEN r.fkEmpresa <> ${idEmpresa} THEN r.nota_consumidor END)
    , 2) AS variacao,

    -- Delta absoluto
    TRUNCATE(
        ABS(
            AVG(CASE WHEN r.fkEmpresa = ${idEmpresa} THEN r.nota_consumidor END)
            -
            AVG(CASE WHEN r.fkEmpresa <> ${idEmpresa} THEN r.nota_consumidor END)
        )
    , 2) AS delta

FROM reclamacoes r
WHERE MONTH(r.data_abertura) = ${mes}
  AND YEAR(r.data_abertura) = ${ano}
GROUP BY r.uf
ORDER BY delta DESC; `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getGraficoEvolucao(idEmpresa, ano) {
  var instrucaoSql = `SELECT
    MONTH(r.data_abertura) AS mes,
    YEAR(r.data_abertura) AS ano,

    TRUNCATE(AVG(CASE WHEN r.fkEmpresa = ${idEmpresa} THEN r.nota_consumidor END), 2)
        AS media_empresa,


    TRUNCATE(AVG(CASE WHEN r.fkEmpresa <> ${idEmpresa} THEN r.nota_consumidor END), 2)
        AS media_mercado,

    TRUNCATE(
        AVG(CASE WHEN r.fkEmpresa = ${idEmpresa} THEN r.nota_consumidor END)
        -
        AVG(CASE WHEN r.fkEmpresa <> ${idEmpresa} THEN r.nota_consumidor END)
    , 2) AS variacao,


    TRUNCATE(
        ABS(
            AVG(CASE WHEN r.fkEmpresa = ${idEmpresa} THEN r.nota_consumidor END)
            -
            AVG(CASE WHEN r.fkEmpresa <> ${idEmpresa} THEN r.nota_consumidor END)
        )
    , 2) AS delta

FROM reclamacoes r
WHERE YEAR(r.data_abertura) = ${ano}
GROUP BY 
    MONTH(r.data_abertura),
    YEAR(r.data_abertura)
ORDER BY ano, mes;`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  getPanoramaKPI,
  getNotaMedia,
  getRankingEmpresa,
  getGraficoMapaDeltaMercado,
  getGraficoEvolucao
};
