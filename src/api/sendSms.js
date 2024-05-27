export default async function handler(req, res) {
    // Replace with your actual Twilio credentials (stored securely in environment variables)
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

    // Extract data from the request body (assuming a POST request)
    const data = await req.json();
    const to = data.to;
    const message = data.message;

    // Create a Twilio client using the Twilio Node.js helper library
    const twilio = require('twilio')(accountSid, authToken);

    try {
        const response = await twilio.messages.create({
            body: message,
            from: twilioNumber,
            to: to
        });
        res.status(200).json({ success: True, messageSid: response.sid });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ success: False, error: 'An error occurred.' });
    }
}
