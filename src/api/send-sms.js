// pages/api/send-sms.js

import { Twilio } from 'twilio';

export default async function handler(req, res) {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    if (req.method === 'POST') {
        const { to, message } = req.body;

        try {
            const response = await client.messages.create({
                body: message,
                from: TWILIO_PHONE_NUMBER,
                to: to
            });
            res.status(200).json({ success: true, messageSid: response.sid });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}
