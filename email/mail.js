const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "kirk64@ethereal.email",
    pass: "7zwkAG3rnA7erpUDwd",
  },
});

const crearMensaje = (remitente, cuerpo) => {
  const mensaje = {
    from: "kirk64@ethereal.email",
    to: remitente,
    subject: "Paradas solicitadas",
    html: cuerpo,
  };

  return mensaje;
};

const enviarEmail = (correo, paradas) => {
  const mensaje = crearMensaje(correo, JSON.stringify(paradas));

  transport.sendMail(mensaje, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

exports = {
  enviarEmail,
};
