var database = require("../database/config");



function buscarPerfilAcesso(idPerfil) {
  var instrucaoSql = `
        SELECT nome FROM perfil WHERE idPerfil = ${idPerfil};
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function findAll() {
  var instrucaoSql = `
        SELECT * FROM perfil;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    buscarPerfilAcesso,
    findAll,
};
