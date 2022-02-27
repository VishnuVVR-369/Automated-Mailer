const express = require("express");
const lineReader = require("line-reader");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

let PORT = process.env.PORT || 3000;
let mailOptions;

async function sendMail() {
  await transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Mail sent successfully");
    }
  });
}

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID, // Your Mail ID
    pass: process.env.MAIL_PASSWORD, // Password of your Mail ID
  },
  tls: {
    rejectUnauthorized: false,
  },
});

lineReader.eachLine("Test.txt", (line, last) => {
  // Mails.txt is a text file which contains names and mail ids in the form NAME : MAILID
  Mail = line.split(" : ");

  mailOptions = {
    from: process.env.MAIL_ID, // Your Mail ID
    to: Mail[1], // Receiers Mail ID
    subject: "Hello " + Mail[0], // Subject Line of your mail
    text: "This is a mail sent using automated nodejs program. Just ignore it.", // Body of your Mail ID
  };

  sendMail();
});

app.get("/", (req, res) => {
  res.send("Running...");
});
