import {
    AudioConfig, CancellationReason,
    ResultReason,
    SpeechConfig,
    SpeechRecognitionResult,
    SpeechRecognizer
} from "microsoft-cognitiveservices-speech-sdk";
import {type ChangeEvent, type RefObject, useRef, useState} from "react";
import {useApiKeys} from "../../providers/ApiKeyProvider.tsx";
import {Button, Flex} from "@radix-ui/themes";

// A lot of this code is modified from: https://github.com/Azure-Samples/AzureSpeechReactSample/tree/main

export default function SpeechToTextInput() {
    const {azureKeys} = useApiKeys();
    const [isRecognizing, setIsRecognizing] = useState<boolean>(false);
    const speechRecognizerRef: RefObject<SpeechRecognizer | null> = useRef<SpeechRecognizer | null>(null);
    const recognizedTextRef: RefObject<string> = useRef<string>("")

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

    async function startContinuousSttFromMic() {
        const audioConfig: AudioConfig = AudioConfig.fromDefaultMicrophoneInput();
        const speechConfig: SpeechConfig = getSpeechConfig();
        const speechRecognizer: SpeechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

        speechRecognizerRef.current = speechRecognizer;

        speechRecognizer.recognized = (_sender, event) => {
            if (event.result.reason === ResultReason.NoMatch) {
                console.log("Speech could not be recognized.");
                return;
            }

            if (event.result.reason === ResultReason.RecognizedSpeech) {
                recognizedTextRef.current += event.result.text + " "
                return;
            }
        }

        speechRecognizer.canceled = (_sender, event) => {
            console.log(`CANCELLED: Reason=${event.reason}`);

            if (event.reason === CancellationReason.Error) {
                console.log(`CANCELED: ErrorCode=${event.errorCode}`);
                console.log(`CANCELED: ErrorDetails=${event.errorDetails}`);
                console.log("CANCELED: Did you set the speech resource key and endpoint values?");
            }

            speechRecognizer.stopContinuousRecognitionAsync();
            setIsRecognizing(false);
        }

        speechRecognizer.sessionStopped = () => {
            console.log("Session stopped.");
            speechRecognizer.stopContinuousRecognitionAsync();
            setIsRecognizing(false);
        }

        speechRecognizer.startContinuousRecognitionAsync();
        setIsRecognizing(true);
        console.log("Continuous recognition started. Speak into your microphone.");
    }

    function stopContinuousSttFromMic() {
        if (speechRecognizerRef.current) {
            speechRecognizerRef.current.stopContinuousRecognitionAsync();
            speechRecognizerRef.current = null;
            setIsRecognizing(false);
            console.log("Continuous recognition stopped.");
            console.log(`Full Recognized Text \n${recognizedTextRef.current}`)
            recognizedTextRef.current ="";
        }
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
            <Button
                variant="outline"
                onClick={() => isRecognizing ? stopContinuousSttFromMic() : startContinuousSttFromMic()}>
                <i className={isRecognizing ? "fa-solid fa-microphone-slash" : "fa-solid fa-microphone"}></i>
            </Button>
        </Flex>
    )
}