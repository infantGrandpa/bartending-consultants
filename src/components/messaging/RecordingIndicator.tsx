import {Flex, Text} from "@radix-ui/themes";
import {type RefObject, useEffect, useRef, useState} from "react";


export default function RecordingIndicator() {
    const [audioLevel, setAudioLevel] = useState<number>(0);

    const streamRef: RefObject<MediaStream | null> = useRef(null);
    const intervalId: RefObject<number> = useRef(0);

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
                const audioContext = new AudioContext();

                const analyser: AnalyserNode = audioContext.createAnalyser();
                analyser.fftSize = 2048;

                const microphone: MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(streamRef.current);
                microphone.connect(analyser);

                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const updateAudioLevels = () => {
                    analyser.getByteTimeDomainData(dataArray);      // This gets the current waveform

                    /*
                    Calculate Root Mean Square (RMS) of the waveform
                    We use RMS because it gives a very accurate measurement of perceived loudness.

                    Values are centered around 128, where 128 represents the 0 on a waveform.
                    Both negative (below 128) and positive (above 128)  values represent "loudness."
                    Those values would cancel out in an average.

                    For example, 64 and 192 are part of the same loud sound wave.
                    Averaging them out would get us 128, which would inaccurately imply silence.

                    So we normalize the values to be centered around 0 instead of 128.
                    Then we square them so positives and negatives don't cancel out.
                    Then we get the mean of those squared values, then get the square root of the mean.

                    Alternatively, we could normalize and then get the absolute values, but that is less accurate.
                     */
                    const sumOfSquares: number = dataArray.reduce((sum, value) => {
                        const centeredValue: number = (value - 128) / 128; // Center around 0, range -1 to 1
                        return sum + (centeredValue * centeredValue);
                    }, 0);

                    // Normalize into a percentage
                    const rms: number = Math.sqrt(sumOfSquares / dataArray.length);
                    const normalizedLevels: number = rms * 100;

                    setAudioLevel(normalizedLevels);
                }

                intervalId.current = window.setInterval(updateAudioLevels, 100);

                console.log(dataArray.length)

            } catch (error) {
                console.error("Error accessing microphone for audio level monitoring:", error);
            }
        }

        initAudioMonitoring();

        return () => {
            abortController.abort();

            if (intervalId.current) {
                window.clearInterval(intervalId.current);
                intervalId.current = 0;
            }

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
            <Text as="p" mt="5" align="center">{audioLevel}</Text>
        </Flex>
    );
}