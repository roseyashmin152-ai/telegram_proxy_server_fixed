const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all requests
app.use(express.json());

// Replace with your bot token & chat ID
const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";

app.post('/send', async (req, res) => {
    const { message } = req.body;

    // Only allow messages containing "Microworkers"
    if (!message.toLowerCase().includes("microworkers")) {
        return res.status(403).send({ success: false, message: "Blocked: Not a Microworkers message" });
    }

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });
        res.send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

app.listen(10000, () => {
    console.log('Server is running on port 10000');
});
