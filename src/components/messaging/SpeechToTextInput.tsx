import {ResultReason, SpeechConfig, AudioConfig, SpeechRecognizer, SpeechRecognitionResult} from "microsoft-cognitiveservices-speech-sdk";
import type { ChangeEvent } from "react";


export default function SpeechToTextInput() {
    const speechKey: string = "speech-key"
    const endpoint: URL = new URL("http://endpoint-url.com");

    async function fileChange(event: ChangeEvent<HTMLInputElement>) {
        const audioFile: File | null = event.target.files?.[0] ?? null;
        if (!audioFile) {
            console.log("No audio file selected.");
            return;
        }

        console.log(audioFile);
        const fileInfo: string = audioFile.name + ` size=${audioFile.size} bytes `;

        console.log(`Selected File: ${fileInfo}`);

        if (audioFile.type !== 'audio/wav') {
            throw new Error("File must be a .wav Audio file.")
        }

        const speechConfig: SpeechConfig = SpeechConfig.fromEndpoint(endpoint, speechKey);
        speechConfig.speechRecognitionLanguage = 'en-US';

        const audioConfig: AudioConfig = AudioConfig.fromWavFileInput(audioFile);
        const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync((result: SpeechRecognitionResult) => {
            let text;
            if (result.reason === ResultReason.RecognizedSpeech) {
                text = `RECOGNIZED: Text=${result.text}`
            } else {
                text = 'ERROR: Speech was cancelled or could not be recognized. Ensure you selected a WAV file.';
            }

            console.log(fileInfo + text);
        });
    }


    return (
        <div className="mt-2">
            <label htmlFor="audio-file"><i className="fa-solid fa-file-audio"></i></label>
            <input
                type="file"
                id="audio-file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => fileChange(e)}
                style={{display: "none"}}
            />
            Convert speech to text from an audio file.
        </div>
    )
}