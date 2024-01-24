if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const SETTINGS = {
	PORT: process.env.PORT || 8080,
	OPENAI_API_URL: process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions',
	OPENAI_API_MODEL: process.env.OPENAI_API_MODEL || 'gpt-4-1106-preview',
};

app.use(express.json());
app.use(cors()); // In production, this should be configured to accept requests only from a known origin.

app.post('/story-completions', async (req, res) => {
	console.log('Got story-completions request from client');
	const messages = req.body;

	try {
		// Make sure we have the necessary data
		if (!messages || !Array.isArray(messages) || messages?.length === 0) {
			return res.status(400).json({ error: 'Expecting an array of messages.' });
		}
		// TODO: handle other possible errors regarding the received data.

		// Call OpenAI GPT API
		const response = await axios
			.post(
				SETTINGS.OPENAI_API_URL,
				{
					model: SETTINGS.OPENAI_API_MODEL,
					messages: messages,
					response_format: { type: 'json_object' },
					temperature: 1, // deterministic 0-2 random
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
						'Content-Type': 'application/json',
					},
				}
			)
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.error(error.response.data);
					throw new Error(error.response.data.message);
				} else if (error.request) {
					console.error(error.request);
					throw new Error('The request was made but no response was received');
				} else {
					console.error('Error', error.message);
					throw new Error('Something happened in setting up the request that triggered an Error');
				}
			});

		res.json(response.data);
	} catch (error) {
		console.error('Error during API request:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(SETTINGS.PORT, () => {
	console.log(`Open stories server is running and listening on port ${SETTINGS.PORT}`);
});
