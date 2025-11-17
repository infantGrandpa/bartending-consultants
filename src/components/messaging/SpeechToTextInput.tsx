import {
    AudioConfig,
    CancellationReason,
    ProfanityOption,
    ResultReason,
    SpeechConfig,
    SpeechRecognizer
} from "microsoft-cognitiveservices-speech-sdk";
import {type RefObject, useRef, useState} from "react";
import {useApiKeys} from "../../providers/ApiKeyProvider.tsx";
import {Flex, IconButton} from "@radix-ui/themes";

// A lot of this code is modified from: https://github.com/Azure-Samples/AzureSpeechReactSample/tree/main

export default function SpeechToTextInput() {
    const {azureKeys} = useApiKeys();
    const [isRecognizing, setIsRecognizing] = useState<boolean>(false);
    const speechRecognizerRef: RefObject<SpeechRecognizer | null> = useRef<SpeechRecognizer | null>(null);
    const recognizedTextRef: RefObject<string> = useRef<string>("")

    const getSpeechConfig = () => {
        const speechConfig: SpeechConfig = SpeechConfig.fromEndpoint(new URL(azureKeys.endpoint), azureKeys.speechKey);
        speechConfig.speechRecognitionLanguage = 'en-US';
        speechConfig.setProfanity(ProfanityOption.Raw);
        return speechConfig;
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
            speechRecognizer.stopContinuousRecognitionAsync();
            setIsRecognizing(false);
        }

        speechRecognizer.startContinuousRecognitionAsync();
        setIsRecognizing(true);
    }

    function stopContinuousSttFromMic() {
        //TODO: Delay halting to avoid losing the last few words.

        if (!speechRecognizerRef.current) {
            console.log("Speech Recognizer Ref is null.");
            return;
        }

        speechRecognizerRef.current.stopContinuousRecognitionAsync();
        speechRecognizerRef.current = null;
        setIsRecognizing(false);
        console.log("Continuous recognition stopped.");
        console.log(`Full Recognized Text \n${recognizedTextRef.current}`)
        recognizedTextRef.current ="";
    }

    return (
        <Flex gap="3">
            <IconButton
                variant="outline"
                onClick={() => isRecognizing ? stopContinuousSttFromMic() : startContinuousSttFromMic()}>
                <i className={isRecognizing ? "fa-solid fa-microphone-slash" : "fa-solid fa-microphone"}></i>
            </IconButton>
        </Flex>
    )
}