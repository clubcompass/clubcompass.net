import { AuthenticationError, UserInputError } from "apollo-server-micro";
import type { User } from "@prisma/client";
import { Context } from "../../ctx";
import { validate } from "../../../utils/validation";
import { newUserSchema } from "../../../utils/validation/schemas";
import * as nodemailer from "nodemailer";
import * as jwt from "jsonwebtoken";
export type SendVerificationEmailArgs = {
  email: User["email"];
};

export type SendVerificationEmailPayload = Awaited<
  ReturnType<typeof sendVerificationEmail>
>;

export const sendVerificationEmail = async (
  _parent: any,
  { email }: SendVerificationEmailArgs,
  { prisma, auth }: Context
): Promise<boolean> => {
  const url = process.env.NEXT_PUBLIC_URL as string;

  if (!url) throw new Error("NEXT_PUBLIC_URL is not set");
  if (auth.email !== email)
    throw new AuthenticationError("You are not authorized to send this email");

  const { valid, errors } = await validate({
    schema: newUserSchema.fields.email,
    data: email,
  });

  if (!valid) throw new UserInputError("Invalid email", { errors });

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, firstname: true, lastname: true, emailVerified: true },
  });

  if (!user) throw new AuthenticationError("User not found", { email });
  if (user.emailVerified)
    throw new AuthenticationError("User already verified");

  const transporter = nodemailer.createTransport({
    port: 1025,
    ignoreTLS: true,
  });

  const { id, firstname, lastname } = user;

  const token = jwt.sign(
    {
      id,
      email,
      firstname,
      lastname,
    },
    process.env.SECRET as string,
    { expiresIn: "2h" }
  );

  await prisma.user.update({
    where: { email },
    data: {
      verificationToken: token,
    },
  });

  const html = `
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="vertical-align:top"
      width="100%"
    >
      <tbody>
        <tr>
          <td
            align="left"
            style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:44px;word-break:break-word"
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="border-collapse:collapse;border-spacing:0px"
            >
              <tbody>
                <tr>
                  <td>
                    <img
                      height="30"
                      src="https://user-images.githubusercontent.com/72945168/159141078-03a8abef-a8c7-472b-bcdb-d44298c6ba14.png"
                      style="border:0;display:block;outline:none;text-decoration:none;height:30px;width:100%;font-size:13px"
                      class="CToWUd"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr>
          <td
            align="left"
            style="font-size:0px;padding:10px 25px;padding-top:24px;padding-bottom:0;word-break:break-word"
          >
            <div
              style="font-family:Source Sans Pro,sans-serif;font-size:15px;line-height:153%;text-align:left;color:#191c23"
            >
              Hi ${firstname} ${lastname},
            </div>
          </td>
        </tr>

        <tr>
          <td
            align="left"
            style="font-size:0px;padding:10px 25px;padding-top:24px;padding-bottom:0;word-break:break-word"
          >
            <div
              style="font-family:Source Sans Pro,sans-serif;font-size:15px;line-height:153%;text-align:left;color:#191c23"
            >
              Almost done! We just need verify that
              <a href="mailto:${email}" target="_blank style="color:#1C5EF9">
                ${email}
                </a>
              is yours, so please verify your email and you’ll be all set.
            </div>
          </td>
        </tr>

        <tr>
          <td
            align="left"
            style="font-size:0px;padding:10px 25px;padding-top:20px;padding-bottom:0;word-break:break-word"
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="border-collapse:separate;line-height:100%"
            >
              <tbody>
                <tr>
                  <td
                    align="center"
                    bgcolor="#1C5EF9"
                    role="presentation"
                    style="border:none;border-radius:4px;background:#1C5EF9"
                    valign="middle"
                  >
                    <a
                      href="${url}/api/verify?token=${token}"
                      style="display:inline-block;background:#1C5EF9;color:#ffffff;font-family:Source Sans Pro,sans-serif;font-size:15px;font-weight:600;line-height:153%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;border-radius:4px"
                      target="_blank"
                      data-saferedirecturl="https://www.google.com/url?q=${url}/api/verify?token=${token}"
                    >
                      Verify your email address
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr>
          <td
            align="left"
            style="font-size:0px;padding:10px 25px;padding-top:32px;word-break:break-word"
          >
            <div
              style="font-family:Source Sans Pro,sans-serif;font-size:15px;line-height:153%;text-align:left;color:#191c23"
            >
              <p>
                If you have questions, we’re here to help! Just
                <a
                href="mailto:support@clubcompass.net?subject=Club%20Compass%20Support"
                title="Contact support"
                style="color:#1C5EF9;text-decoration:none"
                target="_blank"
                  >contact support</a
                >.
              </p>
              <p>The Team at Club Compass</p>
            </div>
          </td>
        </tr>

        <tr>
          <td
            align="left"
            style="font-size:0px;padding:10px 25px;word-break:break-word"
          >
            <div
              style="font-family:Source Sans Pro,sans-serif;font-size:11px;line-height:153%;text-align:left;color:#959daa"
            >
              <a
                href="https://www.clubcompass.net/"
                style="color:#1C5EF9;text-decoration:none"
                target="_blank"
                data-saferedirecturl="https://www.google.com/url?q=https://www.clubcompass.net/"
              >
                clubcompass.net
              </a>

              &nbsp;&nbsp;|&nbsp;&nbsp; San Diego, CA

              <p>
                This message is being sent to you because you have a Club Compass account. Please
                <a
                  href="mailto:support@clubcompass.net?subject=Club%20Compass%20Support"
                  title="Contact us"
                  style="color:#1C5EF9;text-decoration:none"
                  target="_blank"
                  >contact us</a
                >
                if you have any questions.
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  try {
    const info = await transporter.sendMail({
      from: "Club Compass <no-reply@clubcompass.net>",
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: random string`,
      html: html,
    });
  } catch (e) {
    console.log(e);
  }

  return true;
};
