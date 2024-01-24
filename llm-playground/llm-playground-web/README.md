Chat-based stories, using LLM.

Make sure you have a `.env` file in both client and server folders, including the following params:

### client/.env:

```
VITE_SERVER_URL="http://localhost:8080"
```

### server/.env:

```
PORT=8080
OPENAI_API_KEY=<your_private_api_key>
OPENAI_API_URL="https://api.openai.com/v1/chat/completions"
OPENAI_API_MODEL="gpt-4-1106-preview"
```
