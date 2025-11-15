var database = require("../database/config");

function buscarPerfilAcesso(idPerfil) {
  var instrucaoSql = `
        SELECT nome FROM TipoAcesso WHERE idTipoAcesso = ${idPerfil};
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function findAll() {
  var instrucaoSql = `
        SELECT * FROM TipoAcesso;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    buscarPerfilAcesso,
    findAll,
};
