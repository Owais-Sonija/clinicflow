// server/src/services/emailService.ts

import transporter from '../config/email';
import { format } from 'date-fns';
import { AppointmentEmailData, WelcomeEmailData } from '../types';


// ============ EMAIL TEMPLATES ============
const getAppointmentConfirmationTemplate = (data: AppointmentEmailData): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmation</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f7fa; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .appointment-card { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #2563eb; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
            .detail-label { color: #64748b; font-size: 14px; }
            .detail-value { color: #1e293b; font-weight: 600; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; color: #64748b; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0;">✓ Appointment Confirmed</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">ClinicFlow Medical Center</p>
            </div>
            <div class="content">
                <p>Dear <strong>${data.patientName}</strong>,</p>
                <p>Your appointment has been successfully scheduled. Here are the details:</p>
                
                <div class="appointment-card">
                    <div class="detail-row">
                        <span class="detail-label">Doctor</span>
                        <span class="detail-value">Dr. ${data.doctorName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Specialization</span>
                        <span class="detail-value">${data.specialization}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date</span>
                        <span class="detail-value">${format(new Date(data.date), 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Time</span>
                        <span class="detail-value">${data.timeSlot}</span>
                    </div>
                    <div class="detail-row" style="border-bottom: none;">
                        <span class="detail-label">Reason</span>
                        <span class="detail-value">${data.reason}</span>
                    </div>
                </div>
                
                <p><strong>Important Reminders:</strong></p>
                <ul style="color: #475569;">
                    <li>Please arrive 15 minutes before your appointment</li>
                    <li>Bring your ID and insurance card</li>
                    <li>Bring any relevant medical records</li>
                </ul>
                
                <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
                
                <a href="${process.env.CLIENT_URL}/dashboard" class="button">View Appointment</a>
            </div>
            <div class="footer">
                <p>ClinicFlow Medical Center</p>
                <p>123 Medical Center Drive, Healthcare City, HC 12345</p>
                <p>Phone: +1 (555) 123-4567 | Email: info@clinicflow.com</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

const getAppointmentReminderTemplate = (data: AppointmentEmailData): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f7fa; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; }
            .reminder-box { background: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #f59e0b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0;">⏰ Appointment Reminder</h1>
            </div>
            <div class="content">
                <p>Dear <strong>${data.patientName}</strong>,</p>
                <p>This is a friendly reminder about your upcoming appointment:</p>
                
                <div class="reminder-box">
                    <p style="margin: 0;"><strong>Tomorrow at ${data.timeSlot}</strong></p>
                    <p style="margin: 5px 0 0 0;">With Dr. ${data.doctorName} (${data.specialization})</p>
                </div>
                
                <p>Please remember to arrive 15 minutes early.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

const getWelcomeTemplate = (data: WelcomeEmailData): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f7fa; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0;">🎉 Welcome to ClinicFlow!</h1>
            </div>
            <div class="content">
                <p>Dear <strong>${data.name}</strong>,</p>
                <p>Thank you for creating an account with ClinicFlow Medical Center. We're excited to have you!</p>
                
                <p>With your account, you can:</p>
                <ul>
                    <li>Book appointments with our expert doctors</li>
                    <li>View your medical history</li>
                    <li>Receive appointment reminders</li>
                    <li>Access your prescriptions</li>
                </ul>
                
                <a href="${process.env.CLIENT_URL}/dashboard" class="button">Go to Dashboard</a>
            </div>
        </div>
    </body>
    </html>
    `;
};

// ============ EMAIL FUNCTIONS ============

/**
 * Send appointment confirmation email
 */
export const sendAppointmentConfirmation = async (data: AppointmentEmailData): Promise<boolean> => {
    try {
        await transporter.sendMail({
            from: `"ClinicFlow" <${process.env.SMTP_FROM || 'noreply@clinicflow.com'}>`,
            to: data.patientEmail,
            subject: `Appointment Confirmed - ${format(new Date(data.date), 'MMM d, yyyy')} at ${data.timeSlot}`,
            html: getAppointmentConfirmationTemplate(data),
        });
        console.log(`Appointment confirmation sent to ${data.patientEmail}`);
        return true;
    } catch (error) {
        console.error('Failed to send appointment confirmation:', error);
        return false;
    }
};

/**
 * Send appointment reminder email
 */
export const sendAppointmentReminder = async (data: AppointmentEmailData): Promise<boolean> => {
    try {
        await transporter.sendMail({
            from: `"ClinicFlow" <${process.env.SMTP_FROM || 'noreply@clinicflow.com'}>`,
            to: data.patientEmail,
            subject: `Reminder: Appointment Tomorrow at ${data.timeSlot}`,
            html: getAppointmentReminderTemplate(data),
        });
        console.log(`Appointment reminder sent to ${data.patientEmail}`);
        return true;
    } catch (error) {
        console.error('Failed to send appointment reminder:', error);
        return false;
    }
};

/**
 * Send welcome email to new users
 */
export const sendWelcomeEmail = async (data: WelcomeEmailData): Promise<boolean> => {
    try {
        await transporter.sendMail({
            from: `"ClinicFlow" <${process.env.SMTP_FROM || 'noreply@clinicflow.com'}>`,
            to: data.email,
            subject: 'Welcome to ClinicFlow Medical Center!',
            html: getWelcomeTemplate(data),
        });
        console.log(`Welcome email sent to ${data.email}`);
        return true;
    } catch (error) {
        console.error('Failed to send welcome email:', error);
        return false;
    }
};

/**
 * Send appointment cancellation email
 */
export const sendAppointmentCancellation = async (data: AppointmentEmailData): Promise<boolean> => {
    try {
        await transporter.sendMail({
            from: `"ClinicFlow" <${process.env.SMTP_FROM || 'noreply@clinicflow.com'}>`,
            to: data.patientEmail,
            subject: `Appointment Cancelled - ${format(new Date(data.date), 'MMM d, yyyy')}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ef4444;">Appointment Cancelled</h2>
                    <p>Dear ${data.patientName},</p>
                    <p>Your appointment with Dr. ${data.doctorName} on ${format(new Date(data.date), 'MMMM d, yyyy')} at ${data.timeSlot} has been cancelled.</p>
                    <p>If you did not request this cancellation or need to reschedule, please contact us.</p>
                    <p>Thank you,<br>ClinicFlow Medical Center</p>
                </div>
            `,
        });
        return true;
    } catch (error) {
        console.error('Failed to send cancellation email:', error);
        return false;
    }
};