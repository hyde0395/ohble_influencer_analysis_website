import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export default function sendGmail(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASSWORD,
    },
  });

  const toHostMailData = {
    from: "aranea0395@gmail.com",
    to: "apologus0395@gmail.com",
    sugject: `${req.body.id}님으로부터 요청이 들어왔습니다.`,
    text: `ID :${req.body.id} `,
    html: `
    <p>id : ${req.body.id}</p>
    <p>email : ${req.body.email}</p>
    <p>나이 : ${req.body.age}</p>
    <p>성별 : ${req.body.gender}</p>
    `,
  };

  transporter.sendMail(toHostMailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  return res.send("보냈습니다");
}
