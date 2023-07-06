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

async function sendMail(req, res, next) {
  try {
    const { userEmail } = req.body;

    if (!userEmail) throw { msg: "Provide recivers mail please" };

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
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: "Daily Flipkart",
        intro: "Your bill has arrived!",
        table: {
          data: [
            {
              item: "Nodemailer Stack Book",
              description: "A Backend application",
              price: "$10.99",
            },
          ],
        },
        outro: "Looking forward to do more business",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.Email,
      to: userEmail,
      subject: "Place Order",
      html: mail,
    };

    transporter.sendMail(message).then((info) => {
      return res.status(201).json({
        msg: `Mail Sent Successfully to ${userEmail}`,
        info,
      });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports = { sendTestMail, sendMail };
