import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        VerifyTokenExpiry: Date.now() + 3600000, // 1 hours
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "459015312be77a",
        pass: "ec1c67a27397b1",
      },
    });

    const mailingOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    };

    const info = await transporter.sendMail(mailingOptions);

    return info;
  } catch (error) {
    console.log(error);
    return error;
  }
};
