var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);

          usuarioModel
            .buscarEmailPorId(resultadoAutenticar[0].email)
            .then((resultadoAutenticar) => {
              const idEmpresa = resultadoAutenticar[0].fkEmpresa;

              usuarioModel.buscarEmpresa(idEmpresa).then((resultado) => {
                const nomeEmpresa = resultado[0].nomeFantasia;

                if (resultadoAutenticar.length > 0) {
                  res.json({
                    idCadastro: resultadoAutenticar[0].idUsuario,
                    email: resultadoAutenticar[0].email,
                    nome: resultadoAutenticar[0].nome,
                    cargo: resultadoAutenticar[0].cargo,
                    idEmpresa: idEmpresa,
                    nomeEmpresa: nomeEmpresa
                  });
                } else {
                  res.status(204).json({ Error });
                }
              });
            });
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var cpf = req.body.cpfServer;
  var cargo = req.body.cargoServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var chave = req.body.chaveAcessoServer;

  if (!nome || !cpf || !cargo || !email || !senha || !chave) {
    return res.status(400).send("Dados obrigatórios faltando!");
  }

  usuarioModel
    .buscarChave(chave)
    .then((resultadoChaves) => {
      if (resultadoChaves.length == 0) {
        return res.status(403).send("Chave inválida!");
      }

      if (resultadoChaves[0].status == 1) {
        return res.status(403).send("Chave já usada!");
      }

      usuarioModel.atualizarStatusChave(chave).then(() => {
        var fkEmpresa = resultadoChaves[0].fkEmpresa;

        usuarioModel
          .cadastrar(nome, cpf, email, senha, cargo, fkEmpresa)
          .then((resultado) => res.json(resultado))
          .catch((erro) => {
            console.log("Erro ao cadastrar usuário:", erro);
            res.status(500).json(erro.sqlMessage);
          });
      });
    })
    .catch((erro) => {
      console.log("Erro ao validar chave:", erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  autenticar,
  cadastrar,
};
