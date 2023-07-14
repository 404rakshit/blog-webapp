const nodemailer = require("nodemailer");
const mailGen = require("mailgen");

async function sendTestMail(req, res, next) {
  try {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let message = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(message).then((info) => {
      return res.status(201).json({
        msg: "Mail Sent",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
}

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
      link: "#",
    },
  });

  let response = {
    body: {
    name: 'Reader',
    intro: 'Welcome to email verification',
    action: {
      instructions: 'Please click the button below to verify your account',
      button: {
        color: '#33b5e5',
        text: 'Verify account',
        link: `${process.env.CLIENT_URL}/signup?token=${token}`,
      },
    },
    outro: "If you did not make this request, you can safely ignore this email."
  },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.Email,
    to: userEmail,
    subject: "Finish setting up your account",
    html: mail,
  };

  return await transporter.sendMail(message);
  // .then((info) => {
  //   return res.status(201).json({
  //     msg: `Mail Sent Successfully to ${userEmail}`,
  //     info,
  //   });
  // });
}

module.exports = { sendTestMail, sendMail };
