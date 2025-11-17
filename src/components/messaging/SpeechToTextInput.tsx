import {ResultReason, SpeechConfig, AudioConfig, SpeechRecognizer, SpeechRecognitionResult} from "microsoft-cognitiveservices-speech-sdk";
import type { ChangeEvent } from "react";
import {useApiKeys} from "../../providers/ApiKeyProvider.tsx";
import {Button, Flex} from "@radix-ui/themes";

// A lot of this code is modified from: https://github.com/Azure-Samples/AzureSpeechReactSample/tree/main

export default function SpeechToTextInput() {
    const {azureKeys} = useApiKeys();

    const getSpeechConfig = () => {
        const speechConfig: SpeechConfig = SpeechConfig.fromEndpoint(new URL(azureKeys.endpoint), azureKeys.speechKey);
        speechConfig.speechRecognitionLanguage = 'en-US';
        return speechConfig;
    }

    async function recognizeSpeechOnce(audioConfig: AudioConfig) {
        const speechConfig = getSpeechConfig();
        const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

        return new Promise<string>((resolve, reject) => {
            recognizer.recognizeOnceAsync((result: SpeechRecognitionResult) => {
                    if (result.reason === ResultReason.RecognizedSpeech) {
                        resolve(result.text);
                    } else {
                        resolve('ERROR: Speech was cancelled or could not be recognized.')
                    }
                }, (error) => {
                    reject(error);
                }
            )
        });
    }


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

        const audioConfig: AudioConfig = AudioConfig.fromWavFileInput(audioFile);
        const text: string = await recognizeSpeechOnce(audioConfig)
        console.log(`${fileInfo}: ${text}`);
    }


    return (
        <Flex gap="3">
            <label htmlFor="audio-file"><i className="fa-regular fa-file-audio"></i></label>
            <input
                type="file"
                id="audio-file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => fileChange(e)}
                style={{display: "none"}}
            />
            <Button variant="outline" onClick={() => sttFromMic()}>
                <i className="fa-solid fa-microphone"></i>
            </Button>
        </Flex>
    )
}