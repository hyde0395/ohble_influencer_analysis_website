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
    to: "ohmarket22@naver.com",
    subject: `${req.body.id}님이 수요조사를 완료하였습니다.`,
    text: `ID :${req.body.id} `,
    html: `

  <tr>
    <td>ID</td>
    <td>${req.body.id}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>${req.body.email}</td>
  </tr>
  <tr>
  <td>나이</td>
  <td>${req.body.age}</td>
  </tr>
  <tr>
   <td>성별</td>
   <td>${req.body.gender}</td>
 </tr>
  </table>
    `,
  };

  transporter.sendMail(toHostMailData, function (err, info) {
    if (err) console.log(err);
    // else console.log(info);
  });
  return res.send("보냈습니다");
}
