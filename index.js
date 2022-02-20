const express = require("express");
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

let mailOptions = {
  from: process.env.MAIL_ID, // Your Mail ID
  to: "", // Receiers Mail ID
  subject: "First mail from nodemailer", // Subject Line of your mail
  text: "Mail sent using automated node js program", // Body of your Mail ID
};

transporter.sendMail(mailOptions, function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log("Mail sent successfully");
  }
});

app.get("/", (req, res) => {
  res.send("Running...");
});
