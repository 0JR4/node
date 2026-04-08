import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

// Discord webhook via GitHub Secret
const WEBHOOK = `https://discord.com/api/webhooks/${process.env.DISCORD_TOKEN}`;

app.post("/send", async (req, res) => {
  try {
    await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    res.send({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
