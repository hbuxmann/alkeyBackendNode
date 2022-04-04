const sgMail = require('@sendgrid/mail');


const SAK = process.env.SAK;

sgMail.setApiKey(SAK);

const sendMail = {
    //
    send: function (mail) {
        const message = {
            to: [mail],
            from: {
                name: process.env.SENDER,
                email: process.env.EMAIL
            },
            subject: 'Wellcome to Alkemy Challe by Bux',
            text: 'Hello thanks for subscribe to Alkemy Challenge!',
            html: '<h1>Hello thanks for subscribe to Alkemy Challenge!</h1>'
        
        };    
        
        sgMail.send(message)
        .then(response => console.log('Email was sent...'))
        .catch(error => console.log('Error: ' + error));
    
    }
};


module.exports = sendMail;