import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  try {
    const data = req.body;

    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.text();
    res.status(200).send({ status: 'forwarded', response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'proxy error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});