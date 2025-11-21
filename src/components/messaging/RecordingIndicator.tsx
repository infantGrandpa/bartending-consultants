import {Flex, Text} from "@radix-ui/themes";
import {useEffect, useState} from "react";


export default function RecordingIndicator() {
    const [audioLevel, setAudioLevel] = useState<number>(0)

    useEffect(() => {
        startAudioLevelMonitoring();
    }, []);

    async function startAudioLevelMonitoring() {
        try {
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
            const audioContext: AudioContext = new AudioContext();
            const analyser: AnalyserNode = audioContext.createAnalyser();
            const microphone: MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);

            analyser.fftSize = 256;
            microphone.connect(analyser);

            console.log(`Active Audio tracks: ${stream.getAudioTracks().length}`);
            console.log(`Main Track State: ${stream.getAudioTracks()[0]?.readyState}`);
            console.log(`Audio Context State: ${audioContext.state}`);
            console.log(`Audio Context Sample Rate: ${audioContext.sampleRate}`);
            console.log(`Analyzer FftSize: ${analyser.fftSize}`);
            console.log(`Analyzer frequencyBinCount: ${analyser.frequencyBinCount}`);
            console.log(`Analyzer Inputs: ${analyser.numberOfInputs}`);
            console.log(`Microphone Outputs: ${microphone.numberOfOutputs}`);

            const frequencyData = new Uint8Array(analyser.frequencyBinCount);

            const updateLevel = () => {
                analyser.getByteFrequencyData(frequencyData);
                const averageAudioLevel = frequencyData.reduce((sum, value) => sum + value, 0) / frequencyData.length;
                setAudioLevel(averageAudioLevel);
            }

            window.setInterval(updateLevel, 100);

        } catch (error) {
            console.error("Error accessing microphone for audio level monitoring:", error);
        }
    }

    return (
        <Flex direction="column" m="4" justify="center" align="center" minHeight="200px">
            <i className={`fa-solid fa-microphone fa-fade fa-2xl`}></i>
            <Text as="p" mt="5" align="center">Listening...</Text>
            <Text>{audioLevel}</Text>
        </Flex>
    );
}