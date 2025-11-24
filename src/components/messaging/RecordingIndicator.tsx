import {Flex, Text} from "@radix-ui/themes";
import {type RefObject, useEffect, useRef} from "react";


export default function RecordingIndicator() {
    const streamRef: RefObject<MediaStream | null> = useRef(null);
    const audioContextRef: RefObject<AudioContext | null> = useRef(null);

    useEffect(() => {
        startAudioLevelMonitoring();

        return () => {
            if (streamRef.current) {
                stopTracksOnStream(streamRef.current);
            }
        };
    }, []);

    async function startAudioLevelMonitoring() {
        try {
            streamRef.current = await navigator.mediaDevices.getUserMedia({audio: true});
            streamRef.current?.getAudioTracks().forEach((track, index) => {
                console.log(`Track ${index}: ${track.label}`);
            })

            audioContextRef.current = new AudioContext();
            console.log(`Sample Rate: ${audioContextRef.current?.sampleRate}`);

            const analyser: AnalyserNode = audioContextRef.current.createAnalyser();
            console.log(`Fft Size: ${analyser.fftSize}`);

            const microphone = audioContextRef.current.createMediaStreamSource(streamRef.current);
            console.log(microphone.numberOfOutputs);


        } catch (error) {
            console.error("Error accessing microphone for audio level monitoring:", error);
        }
    }

    function stopTracksOnStream(mediaStream: MediaStream) {
        mediaStream.getTracks().forEach(
            (track, index) => {
                console.log(`Stopping Track ${index} (${track.label})`);
                track.stop()
                track.enabled = false;      //TODO: Check if we need to manually disable
            });
    }

    return (
        <Flex direction="column" m="4" justify="center" align="center" minHeight="200px">
            <i className={`fa-solid fa-microphone fa-fade fa-2xl`}></i>
            <Text as="p" mt="5" align="center">Listening...</Text>
        </Flex>
    );
}