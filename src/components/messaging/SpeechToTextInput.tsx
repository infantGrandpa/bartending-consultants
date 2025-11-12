import {ResultReason, SpeechConfig, AudioConfig, SpeechRecognizer} from "microsoft-cognitiveservices-speech-sdk";


export default function SpeechToTextInput() {
    const speechKey: string = "speech-key"
    const endpoint: URL = new URL("http://endpoint-url.com");

    async function fileChange(event) {
        const audioFile = event.target.files[0];
        console.log(audioFile);
        const fileInfo = audioFile.name + ` size=${audioFile.size} bytes `;

        console.log(fileInfo);

        const speechConfig: SpeechConfig = SpeechConfig.fromEndpoint(endpoint, speechKey);
        speechConfig.speechRecognitionLanguage = 'en-US';

        const audioConfig = AudioConfig.fromWavFileInput(audioFile);
        const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(result => {
            let text;
            if (result.reason === ResultReason.RecognizedSpeech) {
                text = `RECOGNIZED: Text=${result.text}`
            } else {
                text = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            console.log(fileInfo + text);
        });
    }


    return (
        <div className="mt-2">
            <label htmlFor="audio-file"><i className="fas fa-file-audio fa-lg mr-2"></i></label>
            <input
                type="file"
                id="audio-file"
                onChange={(e) => fileChange(e)}
                style={{display: "none"}}
            />
            Convert speech to text from an audio file.
        </div>
    )
}