const express = require("express");
const lineReader = require("line-reader");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();

let PORT = process.env.PORT || 3000;

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

lineReader.eachLine("Mails.txt", (line, last) => { // Mails.txt is a text file which contains names and mail ids in the form NAME : MAILID
  Mail = line.split(" : ");

  let mailOptions = {
    from: process.env.MAIL_ID, // Your Mail ID
    to: Mail[1], // Receiers Mail ID
    subject: "Hello " + Mail[0] + " this is Vishnu", // Subject Line of your mail
    text: "This is a mail sent using automated nodejs program. Just ignore it.", // Body of your Mail ID
  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Mail sent successfully");
    }
  });
});

app.get("/", (req, res) => {
  res.send("Running...");
});
