import * as nodemailer from "nodemailer";
// import * as bcrypt from "bcrypt";
// import * as sgTransport from "nodemailer-sendgrid-transport";
const mail = async (req, res) => {
  const { email } = req.body;
  const nums = "1234567890";
  let code = "";
  for (let i = 6; i > 0; i--) {
    code += nums[Math.floor(Math.random() * nums.length)];
  }
  console.log(code); //! REMOVE WHEN GOING INTO PRODUCTION
  // TODO: Should be replaced with JWT magic link

  // const options = {
  //   auth: {
  //     api_user: process.env.SENDGRID_USERNAME,
  //     api_key: process.env.SENDGRID_KEY,
  //   },
  // };

  // let transporter = nodemailer.createTransport(sgTransport(options));
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 2525,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: "Club Compass <no-reply@clubcompass.net>",
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${code
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, "-")}`,
      html: `<b>Your verification code is: ${code
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, "-")}</b>`,
    });
    return res.status(200).json({
      status: "success",
      message: "Sent Verification code",
      code: code.toString(),
    });
  } catch (e) {
    console.log(e);
  }
};

export default mail;
