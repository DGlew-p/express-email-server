const nodemailer = require("nodemailer");
module.exports = {
  create,
};

let transport = {
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
};
let transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Trans success");
  }
});

async function create(req, res) {
  console.log("create controler");
  try {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.messageHtml;

    const ejs = require("ejs");

    ejs.renderFile(
      __dirname + "/emailTemp.ejs",
      { name: name, email: email, message: message },
      function (err, data) {
        if (err) {
          console.log(error);
        } else {
          var mailOptions = {
            from: email,
            to: process.env.USER,
            subject: name,
            template: "emailTemp",
            html: data,
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log(err.info);
              res.status(500).send({
                success: false,
              });
            } else {
              res.send({
                success: true,
              });
            }
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      success: false,
    });
  }
}
