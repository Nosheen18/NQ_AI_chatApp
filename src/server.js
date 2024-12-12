const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();  // Load environment variables from .env

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userInput = req.body.message;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userInput }],
                max_tokens: 150
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        // Log the complete error object for debugging purposes
        console.error('Error contacting OpenAI:', error.response ? error.response.data : error.message);
        res.status(500).send('An error occurred while processing your request.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
