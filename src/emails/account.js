const sgMail = require('@sendgrid/mail')
const sendgridAPIKEY = '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'
sgMail.setApiKey(sendgridAPIKEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'itphanhoangduc@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'itphanhoangduc@gmail.com',
        subject: 'Thanks for joining in',
        text: `Goodbye ${name}! you have just out my app.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendByeEmail
}
