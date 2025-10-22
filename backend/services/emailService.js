// services/emailService.js
const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail({ to, subject, templateName = 'default', templateVars = {}, attachments = [] }) {
  const templatePath = path.join(__dirname, '..', 'emails', `${templateName}.html`);
  let html = `<p>${templateVars.body || 'You have a new notification'}</p>`;

  if (fs.existsSync(templatePath)) {
    const source = fs.readFileSync(templatePath, 'utf8');
    const tpl = handlebars.compile(source);
    html = tpl(templateVars);
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    attachments
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
