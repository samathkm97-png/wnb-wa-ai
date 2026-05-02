import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const META_TOKEN = process.env.META_TOKEN;
const PHONE_ID = process.env.PHONE_ID;

app.get("/", (req, res) => {
  res.send("Server hidup bro 🔥");
});

app.post("/webhook", async (req, res) => {
  const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!msg) return res.sendStatus(200);

  await axios.post(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
    messaging_product: "whatsapp",
    to: msg.from,
    text: { body: "Reply test berjaya bro 👍" }
  }, {
    headers: {
      Authorization: `Bearer ${META_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  res.sendStatus(200);
});

app.listen(3000);
