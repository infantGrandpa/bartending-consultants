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
import {AlertDialog, Button, Flex, IconButton} from "@radix-ui/themes";
import {useDevSettings} from "../../providers/DevSettingsProvider.tsx";
import RecordingIndicator from "./RecordingIndicator.tsx";

// A lot of this code is modified from: https://github.com/Azure-Samples/AzureSpeechReactSample/tree/main

interface Props {
    onRecognizedText: (recognizedText: string) => void;
}

export default function SpeechToTextInput({onRecognizedText}: Props) {
    const {azureKeys} = useApiKeys();
    const {settings} = useDevSettings();

    const [isRecognizing, setIsRecognizing] = useState<boolean>(false);
    const [isStoppingRecognition, setIsStoppingRecognition] = useState<boolean>(false);
    const [hasRecordingError, setHasRecordingError] = useState<boolean>(false);
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

        setIsRecognizing(true);

        if (settings.useDummyStt) {
            await new Promise(resolve => setTimeout(resolve, 300));
            const dummyResponses = [
                "This is a dummy Speech to Text response.",
                "Here's another sample transcription.",
                "Testing the speech recognition system.",
                "This text was generated for testing purposes.",
                "Dummy audio transcription complete."
            ];
            const timestampBasedIndex = Date.now() % dummyResponses.length;
            recognizedTextRef.current = dummyResponses[timestampBasedIndex];
            return;
        }

        speechRecognizer.startContinuousRecognitionAsync();
    }

    function returnRecognizedText() {
        const trimmedText = recognizedTextRef.current.trim()
        console.log(`Full Recognized Text \n${trimmedText}`)
        onRecognizedText(trimmedText);
        recognizedTextRef.current = "";
    }

    async function stopContinuousSttFromMic() {
        setIsStoppingRecognition(true);
        if (settings.useDummyStt) {
            await new Promise(resolve => setTimeout(resolve, 200));
            returnRecognizedText();
            setIsStoppingRecognition(false);
            return;
        }

        const currentRecognizer: SpeechRecognizer | null = speechRecognizerRef.current;

        if (!currentRecognizer) {
            setIsStoppingRecognition(false);
            return;
        }

        await new Promise<void>((resolve) => {
            currentRecognizer.sessionStopped = () => {
                resolve();
            };

            currentRecognizer.stopContinuousRecognitionAsync();
        });

        stopAndClearSpeechRecognizer();
        returnRecognizedText();

        setIsStoppingRecognition(false);
    }

    function stopAndClearSpeechRecognizer() {
        speechRecognizerRef.current?.stopContinuousRecognitionAsync();
        speechRecognizerRef.current = null;
        setIsRecognizing(false);
    }

    function handleCancelSttFromMic() {
        setIsStoppingRecognition(true);
        stopAndClearSpeechRecognizer();
        recognizedTextRef.current = "";
        setIsStoppingRecognition(false);
    }

    // We use an AlertDialog instead of a regular one because the AlertDialog is modal.
    // We can't make a Dialog modal (unless we use a primitive which is too much work).
    return (
        <AlertDialog.Root open={isRecognizing}>
            <AlertDialog.Trigger>
                <IconButton radius="full" variant="solid"
                            style={{
                                color: "var(--gray-3)",
                                width: "64px",
                                height: "64px"
                            }}
                            loading={isStoppingRecognition}
                            onClick={startContinuousSttFromMic}
                >
                    <i className="fa-solid fa-microphone fa-xl"></i>
                </IconButton>
            </AlertDialog.Trigger>

            <AlertDialog.Content>
                <AlertDialog.Title>Speech to Text</AlertDialog.Title>
                <AlertDialog.Description>What are you in the mood for?</AlertDialog.Description>
                <RecordingIndicator
                    onErrorChange={setHasRecordingError}
                />
                <Flex direction="row" justify="end" gap="3">
                    <AlertDialog.Cancel>
                        <Button color="gray" variant="soft" onClick={handleCancelSttFromMic}>
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button
                            loading={isStoppingRecognition}
                            onClick={stopContinuousSttFromMic}
                            disabled={hasRecordingError}
                        >
                            Done Speaking
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}