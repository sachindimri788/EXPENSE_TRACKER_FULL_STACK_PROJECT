require('dotenv').config({ path: './env/development.env' })
const Sib = require('sib-api-v3-sdk')

async function sendMail(email,id) {
    const result={}
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.EMAIL_API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = {
        email: 'dimrisachin79@gmail.com',
        name: 'Sachin Dimri',
    }
    const receivers = [
        {
            email: email,
        },
    ]

    await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Reset Password',
        htmlContent: `<h3>Hi! We got the request from you for reset the password. Here is the link below >>></h3>
        <a href="http://127.0.0.1:5500/src/views/resetPassword/resetPassword.html?id=${id}"> Click Here</a>`,
    })
    return result.message="The reset link has been sent to your registered email.";
}
module.exports = sendMail;