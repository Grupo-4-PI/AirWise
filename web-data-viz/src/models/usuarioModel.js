var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucaoSql = `
        SELECT idusuario, nome, email FROM usuario WHERE email = '${email}' AND senha = md5('${senha}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, cpf, email, senha, cargo, fkEmpresa) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cpf, email, senha, cargo, fkEmpresa);

  var instrucaoSql = `
        INSERT INTO usuario (fkEmpresa, nome, cpf, email, senha, cargo) 
        VALUES ( '${fkEmpresa}','${nome}', '${cpf}', '${email}', md5('${senha}'), '${cargo}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function buscarChave(codigo) {
  var instrucaoSql = `
        SELECT idChave, codigo, status, fkEmpresa, dataCriacao
        FROM chaveDeAcesso
        WHERE codigo = '${codigo}';
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarStatusChave(codigo) {
  var instrucaoSql = `
        UPDATE chaveDeAcesso
        SET status = 1
        WHERE codigo = '${codigo}';
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function buscarEmailPorId(email) {
  var instrucaoSql = `SELECT * FROM usuario WHERE email = '${email}'`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarEmpresa(idEmpresa) {
  var instrucaoSql = `SELECT * FROM empresa WHERE idEmpresa = '${idEmpresa}'`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  autenticar,
  cadastrar,
  buscarEmailPorId,
  atualizarStatusChave,
  buscarChave,
  buscarEmpresa
};
