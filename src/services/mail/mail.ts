import nodemailer from "nodemailer";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";

const resetTemplate = fs.readFileSync(path.join(__dirname, "../../views/resetPassword.hbs"),"utf-8");
const reportTemplate = fs.readFileSync(path.join(__dirname, "../../views/reportMessage.hbs"),"utf-8");

class AppMail {
  constructor(
    public recipientMail: string, 
    public recipientName?: string, 
    public resetUrl?: string,
    public report?: any,
    public doctorName?: string,
    public userAge?: number,
    public userGender?: string,
  ){}

  private template = handlebars.compile(resetTemplate);
  private reportTemplate = handlebars.compile(reportTemplate);

  //Reset Message
  private resetMessageToSend = this.template({
    recipientName: this.recipientName,
    appName: "Palmed Medical Institute",
    resetUrl: this.resetUrl,
  });

   //Report Message
   private reportMessageToSend = this.reportTemplate({
    userName: this.recipientName,
    predictionResult : this.report,
    doctorName: this.doctorName,
    userAge: this.userAge,
    userGender: this.userGender
  });










  //creating transport
  createTransport() {
    return nodemailer.createTransport({
      host: process.env.HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,
      },
    });
  }

  async sendMail(subject: string, htmlTemplateOrMessage: any) {
    const info = await this.createTransport().sendMail({
      from: process.env.USER,
      to: this.recipientMail,
      subject,
      html: htmlTemplateOrMessage,
    });

    console.log("Message sent: %s", info.messageId);
  }

  resetEmailMessage() {
    this.sendMail("PASSWORD RESET", this.resetMessageToSend);
  }

  reportMessage() {
    this.sendMail("HEART DISEASE TEST RESULTS", this.reportMessageToSend);
  }
}

export default AppMail;