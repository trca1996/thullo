const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `Igor <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendPasswordReset() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Your password reset token",
      html: `<div><h3>Forgot Password</h3>
      <p>Hello ${this.firstName}</p>
      <p>Click button bellow to reset password:</p>
      <a href=${this.url}><Button style="
      background-color: #008CBA; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    ">Reset Password</Button></a>
    </br>
    <p>Or go to this link</p>
    </br>
    <p>${this.url}</p>
    <p>If you have not requested this email, then ignore it.</p>
      </div>`,
    };

    const info = await this.newTransport().sendMail(mailOptions);
  }
};
