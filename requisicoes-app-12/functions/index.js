const functions = require("firebase-functions");

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

let mailTransport = nodemailer.createTransport({
  server: "gmail",
  auth: {
    user: "requicioesapp12@gmail.com",
    pass: "Requisicoes12",
  },
});

exports.createUser = functions.firestore
  .document("/funcionarios/{documentId}")
  .onCreate((snap, context) => {
    const functionario = snap.data();
    const email = functionario.email;
    const nome = functionario.nome;
    return admin
      .auth()
      .createUser({
        uid: `${email}`,
        email: `${email}`,
        emailVerified: false,
        password: `123456`,
        displayName: `${nome}`,
        disabled: false,
      })
      .then((userRecord) => {
        console.log(`Usuário registrado com sucesso.`);
        return userRecord;
      })
      .catch(function (error) {
        console.log("Não foi possível criar o usuário", error);
      });
  });

exports.notifyUser = functions.firestore
  .document("/requisicoes/{documentId}")
  .onUpdate((snap, context) => {
    const requisicao = snap.after.data();
    const solicitante = requisicao.solicitante;
    const email = solicitante.email;
    const movimentacoes = requisicao.movimentacoes;
    if (movimentacoes.length > 0) {
      const movimentacao = movimentacoes[movimentacoes.length - 1];
      console.log(movimentacao);
      const text = `<h2>Sua requisição recebeu uma atualização!</h2>
      <h3>Descricao: ${movimentacao.descricao}</h3>
      <h4>Status: ${movimentacao.status}</h4>`;
      const mailOptions = {
        from: `<noreply@firebase.com>`,
        to: email,
        subject: `Sistema de Requisições | Processamento de Requisições`,
        html: `${text}`,
      };
      return mailTransport
        .sendMail(mailOptions)
        .then(() => {
          console.log("Email enviado para: ", email);
          return null;
        })
        .catch((error) => {
          console.log("Não foi possivel notificar o usuário: ", error);
        });
    }
  });
