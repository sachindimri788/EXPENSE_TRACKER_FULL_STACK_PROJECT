require('dotenv').config({ path: './env/development.env' })
const Sib = require('sib-api-v3-sdk')

async function sendMail(email) {
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
        subject: 'Subscribe to Cules Coding to become a developer',
        htmlContent: `      <h1>hi</h1>  `,
    })
    return result.message="The reset link has been sent to your registered email.";
}
module.exports = sendMail;