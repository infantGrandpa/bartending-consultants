import { readFileSync } from "fs";
import {
    SpeechConfig,
    AudioConfig,
    SpeechRecognizer,
    ResultReason,
    CancellationDetails,
    CancellationReason,
    SpeechRecognitionResult
} from "microsoft-cognitiveservices-speech-sdk";

// This example requires environment variables named "ENDPOINT" and "SPEECH_KEY"
const speechConfig: SpeechConfig = SpeechConfig.fromEndpoint(new URL(process.env.ENDPOINT!), process.env.SPEECH_KEY!);
speechConfig.speechRecognitionLanguage = "en-US";

function fromFile(): void {
    const filePath: string = "E:\\web-dev\\bartending-consultants\\files\\voice-sample.wav"
    console.log(`File to Read: ${filePath}`);

    const audioConfig: AudioConfig = AudioConfig.fromWavFileInput(readFileSync(filePath));
    const speechRecognizer: SpeechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

    console.log(`Starting recognition...`)

    speechRecognizer.recognizeOnceAsync((result: SpeechRecognitionResult) => {
        console.log(`Recognition complete.`)
        switch (result.reason) {
            case ResultReason.RecognizedSpeech:
                console.log(`RECOGNIZED: Text=${result.text}`);
                break;
            case ResultReason.NoMatch:
                console.log("NOMATCH: Speech could not be recognized.");
                break;
            case ResultReason.Canceled:
                const cancellation: CancellationDetails = CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason === CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
        }
            speechRecognizer.close();
            process.exit(0);
        },
        (error: string) => {
            console.log(`ERROR: ${error}`);
            speechRecognizer.close();
            process.exit(1);
        }
    );
}

fromFile();