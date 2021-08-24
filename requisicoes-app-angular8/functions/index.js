const functions =  require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();
 
var mailTransport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7c2d71431f52d5",
      pass: "64d916983c158e"
    }
  });

exports.createUser = functions.firestore.document('/funcionarios/{documentId}').onCreate((snap, context) => {
    const funcionario = snap.data();
    const email = funcionario.email;
    const nome = funcionario.nome;
    return admin.auth().createUser({
        uid: `${email}`,
        email: `${email}`,
        emailVerified: false,
        password: `mudesuasenha`,
        displayName: `${nome}`,
        disabled: false
    })
    .then((userRecord) => {console.log('Usuários registrado com sucesso')
        return userRecord;
    })
    .catch(function (error){
        console.log("Não foi possível criar o usuário", error)
    })
})

exports.notifyUser = functions.firestore
  .document('/requisicoes/{documentId}')
  .onUpdate((snap) => {

    const requisicao = snap.after.data();
    const solicitante = requisicao.solicitante;
    const email = solicitante.email;
    const movimentacoes = requisicao.movimentacoes;

    if (movimentacoes.length > 0) {
      const movimentacao = movimentacoes[movimentacoes.length - 1];

      const texto = `<h2> Sua requisição recebeu uma atualização! </h2>
                     <h3> Descricao:   ${movimentacao.descricao} </h3>
                     <h4> Status:  ${movimentacao.status}  <br> `
      const mailOptions = {
        from: `<noreply@firebase.com>`,
        to: email,
        subject : `Sistema de Requisições | Processamento de Requisições`,
        html : `${texto}`
      };
      return mailTransport.sendMail(mailOptions).then(() => {
        console.log('Email enviado para:', email);
        return null;
      }).catch((error) => {
        console.log("Não foi possível notificar  o usuário:", error);
      });
    }
  })
