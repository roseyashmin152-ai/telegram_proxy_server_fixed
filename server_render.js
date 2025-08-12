import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// CORS Allow
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

const BOT_TOKEN = "তোমার বট টোকেন";
const CHAT_ID = "তোমার চ্যাট আইডি";

// শুধু Microworkers মেসেজ Allow
app.post("/send", async (req, res) => {
    const { text } = req.body;

    if (!text || !text.toLowerCase().includes("microworkers")) {
        return res.status(403).json({ ok: false, error: "Message not allowed" });
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text })
        });

        const result = await response.json();
        if (!result.ok) {
            console.error("Telegram send error:", result);
        }

        res.json(result);
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ ok: false, error: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
