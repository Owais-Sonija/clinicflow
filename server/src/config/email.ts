// server/src/config/email.ts

import nodemailer from 'nodemailer';

// ============ EMAIL TRANSPORTER ============
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// ============ VERIFY CONNECTION ============
export const verifyEmailConnection = async (): Promise<boolean> => {
    try {
        await transporter.verify();
        console.log('Email server connection established');
        return true;
    } catch (error) {
        console.error('Email server connection failed:', error);
        return false;
    }
};

export default transporter;