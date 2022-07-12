const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validateResult } = require("express-validator/check");

const User = require("../models/user");

const Transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
