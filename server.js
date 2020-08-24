const express = require('express');
const enforce = require('express-sslify');
const nodemailer = require('nodemailer');
const public = require('./routes/public');
const protected = require('./routes/protected');
const dotenv = require('dotenv');
const app = express();
const connectDB = require('./config/db');
dotenv.config({ path: './config/.env' });

connectDB();

// app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/', public);
app.use('/api', protected);
app.use('/api/email', sendEmail)

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'chrisjones0517@gmail.com',
        pass: process.env.EMAIL_PASS
    }
});

function sendEmail(req, res, next) {
    try {
        for (let i = 0; i < req.body.length; i++) {
            const firstName = req.body[i].contactName.split(' ')[0].trim();
            const message = req.body[i].message;
            let msg = message.replace('%company%', req.body[i].company);
            msg = msg.replace('%first%', firstName);
            msg = msg.replace('%name%', req.body[i].contactName);
            msg = msg.replace('%position%', req.body[i].position);

            const mailOptions = {
                from: 'chrisjones0517@gmail.com',
                to: req.body[i].email,
                subject: req.body[i].subject,
                text: msg,
                html: `
                    <p><pre style="font-family:Arial;">${msg}</pre></p><table><tr><td style="vertical-align:top;padding-top:5px;"><img src="cid:b7sS93NO25AqtYbz08iwK@nodemailer.com" /></a></td><td style="padding-left:5px;max-width:150px;"><p style="font-size:18px;font-weight:700;margin:0">Chris Jones</p><p style="margin:0;">Full-stack web developer</p><p style="margin:5px 0;"><span style="font-weight:700;">Phone:</span> 901-289-3162</p><span style="font-weight:700;">Location: </span><br>Richmond, TX<br><br><a style="padding-top:" href="https://www.linkedin.com/in/chris-jones-9094661b5/"><img src="cid:dk5b329dj02ejzq83pex7@nodemailer.com" /></a><a href="https://www.codewars.com/users/chrisjones0517" style="margin-left:10px;"><img src="cid:kd29dn0du51bwi8xbt2o3c8m@nodemailer.com" /></a><a href="https://github.com/chrisjones0517" style="margin-left:10px;"><img src="cid:46h68f2shhl4llu8a7sp2kd4d0vg9mr@nodemailer.com" /></a></td></tr></table>`,
                attachments: [{
                    filename: 'chris_jones.png',
                    path: __dirname + '/public/chris_jones.png',
                    cid: 'b7sS93NO25AqtYbz08iwK@nodemailer.com'
                },
                {
                    filename: 'linkedin.png',
                    path: __dirname + '/public/linkedin.png',
                    cid: 'dk5b329dj02ejzq83pex7@nodemailer.com'
                },
                {
                    filename: 'codewars.png',
                    path: __dirname + '/public/codewars.png',
                    cid: 'kd29dn0du51bwi8xbt2o3c8m@nodemailer.com'
                },
                {
                    filename: 'github.png',
                    path: __dirname + '/public/github.png',
                    cid: '46h68f2shhl4llu8a7sp2kd4d0vg9mr@nodemailer.com'
                },
                {
                    filename: 'chrisjones2020.pdf',
                    path: __dirname + '/public/chrisJones2020.pdf'
                },
                {
                    filename: 'chrisjones2020.doc',
                    path: __dirname + '/public/chrisJones2020.doc'
                }]
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.sendStatus(500);
                } else {
                    if (i === req.body.length - 1) {
                        return res.sendStatus(200);
                    }
                }
            });
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

