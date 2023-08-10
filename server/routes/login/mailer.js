const nodemailer = require("nodemailer");
const mailGen = require("mailgen");

async function sendMail(userEmail, token) {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new mailGen({
    theme: "default",
    product: {
      name: "READER",
      link: process.env.CLIENT_URL,
    },
  });

  let response = {
    body: {
    name: 'Reader',
    intro: 'Welcome to Password Mail Verification',
    action: {
      instructions: 'Please click the button below to verify your account',
      button: {
        color: '#33b5e5',
        text: 'Verify Account',
        link: `${process.env.CLIENT_URL}/password/${token}`,
      },
    },
    outro: "If you did not make this request, you can safely ignore this email."
  },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.Email,
    to: userEmail,
    subject: "Verify to Change your Password",
    html: mail,
  };

  return await transporter.sendMail(message);
}

module.exports = { sendMail };
