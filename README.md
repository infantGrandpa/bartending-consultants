# Bartending Consultants

Select a bartender, tell them what you like, and they'll give you a drink (that you have to make).

Built using React with Radix UI. Connects to the OpenAI and ElevenLabs API.

## To Run

1. Install dependencies:`npm install`
2. Run program: `npm run dev`
3. Open app at http://localhost:5173/ (or whatever port yours launches on)

## Tech Stack
This project uses OpenAI to generate responses for each bartender. It then uses ElevenLabs Text to Speech API to speak these messages aloud.

In the future, I plan to use Azure Speech to Text API to allow users to speak directly to the bartenders rather than typing.

The project is built using React, Vite, and Radix UI. It also currently uses FontAwesome for icons.

The background is generated from [SVG Backgrounds](https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/).

## API Keys

Instead of storing API keys in environment variables, I've opted to allow you to input your own in the app itself. These keys are stored locally in your browser's storage. The app requires an API key for OpenAI and ElevenLabs

### OpenAI API Key
Create an OpenAI API key in your OpenAI dashboard: [Learn More](https://platform.openai.com/docs/quickstart)

### ElevenLabs API Key
Create an ElevenLabs API key in your ElevenLabs dashboard: [Learn More](https://elevenlabs.io/docs/quickstart)