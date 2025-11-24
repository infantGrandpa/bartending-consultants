import {Flex, Text} from "@radix-ui/themes";
import {type RefObject, useEffect, useRef} from "react";


export default function RecordingIndicator() {
    const streamRef: RefObject<MediaStream | null> = useRef(null);
    const audioContextRef: RefObject<AudioContext | null> = useRef(null);

    useEffect(() => {
        const abortController = new AbortController();

        async function initAudioMonitoring() {
            try {
                const newStream: MediaStream = await navigator.mediaDevices.getUserMedia({audio: true});

                // We need to handle the double mounting of this component when is Strict Mode.
                // Strict Mode's second mounting overwrites streamRef, meaning we never stop all the tracks on it.
                // Without this, the browser will think we never stopped recording while is strict mode.
                if (abortController.signal.aborted) {
                    stopTracksOnStream(newStream);
                    return;
                }

                streamRef.current = newStream;
                audioContextRef.current = new AudioContext();

                const analyser: AnalyserNode = audioContextRef.current.createAnalyser();
                console.log(`Fft Size: ${analyser.fftSize}`);

                const microphone = audioContextRef.current.createMediaStreamSource(streamRef.current);
                console.log(microphone.numberOfOutputs);
            } catch (error) {
                console.error("Error accessing microphone for audio level monitoring:", error);
            }
        }

        initAudioMonitoring();

        return () => {
            abortController.abort();

            if (streamRef.current) {
                stopTracksOnStream(streamRef.current);
            }
        };
    }, []);


    function stopTracksOnStream(mediaStream: MediaStream) {
        mediaStream.getTracks().forEach(
            (track: MediaStreamTrack) => {
                track.stop()
            });
    }

    return (
        <Flex direction="column" m="4" justify="center" align="center" minHeight="200px">
            <i className={`fa-solid fa-microphone fa-fade fa-2xl`}></i>
            <Text as="p" mt="5" align="center">Listening...</Text>
        </Flex>
    );
}