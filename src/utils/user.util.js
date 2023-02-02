const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = process.env.CLIENT_IDFP
const CLEINT_SECRET = process.env.CLEINT_SECRETFP
const REDIRECT_URI = process.env.REDIRECT_URIFP
const REFRESH_TOKEN = process.env.REFRESH_TOKENFP


const oAuth2Client = new google.auth.OAuth2(
 CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(email,token) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'hborse1@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'HIMANSHU BORSE <hborse1@gmail.com>',
      to: 'patildhanshrees6112@gmail.com',
      subject: 'Reset password link',
      text: 'Hello ',
      html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/${token}">click here</a></h1>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('EMAIL IS SENT TO THE USER.....', result))
  .catch((error) => console.log(error.message));