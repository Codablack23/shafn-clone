const crypto = require("crypto")
const nodemailer = require("nodemailer");


//Request Handler function
export default function handler(req, res) {
  const { name, email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASSWORD,
    },
  });

  const code = crypto.randomInt(0, 1000000).toString().padStart(6, "0");

  const message = {
    from: process.env.NODEMAILER_AUTH_USER,
    to: email,
    subject: "ShafN - Verification Code",
    html: `
                    <h3> Hello, ${name} </h3>
                    <p>Your email verification code is <strong>${code}</strong></p>

                    <p>Thanks, <br /> ShafN Team</p>
                  `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, function (err, info) {
      if (err) {
        res.status(err.responseCode || 500).json(err);
      } else {
        res.status(200).json({ code });
        resolve();
      }
    });
  });
}
