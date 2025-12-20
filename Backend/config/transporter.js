import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port:SMTP_PORT,
    secure:false,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_KEY
    }
})

transporter.verify().then(()=>{

}) 