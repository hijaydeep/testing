import React, { useState } from 'react';

const SendSms = () => {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ to, message })
        });

        const data = await res.json();
        setResponse(data);
    };

    return (
        <div>
            <h1>Send SMS</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>To:</label>
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send SMS</button>
            </form>
            {response && (
                <div>
                    {response.success
                        ? `Message sent successfully! SID: ${response.messageSid}`
                        : `Error: ${response.error}`}
                </div>
            )}
        </div>
    );
};

export default SendSms;
