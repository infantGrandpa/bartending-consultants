import {Box, Callout, Flex} from "@radix-ui/themes";
import {type RefObject, useEffect, useRef, useState} from "react";

interface Props {
    // I forgot that the error checking should probably be in the parent component, not here.
    // I started work on it, but because it uses Azure to handle the microphone, it would require a lot of work.
    // This works well enough for now, so we'll just pass the error value back to the parent.
    // Feel free to put SpeechToTextInput.tsx in charge of this instead of this component.
    onErrorChange?: (hasError: boolean) => void;
}

export default function RecordingIndicator({onErrorChange}: Props) {
    const [audioLevel, setAudioLevel] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const streamRef: RefObject<MediaStream | null> = useRef(null);
    const intervalId: RefObject<number> = useRef(0);

    useEffect(() => {
        if (onErrorChange) {
            onErrorChange(error !== null);
        }
    }, [error, setError]);

    useEffect(() => {
        const abortController: AbortController = new AbortController();

        async function initAudioMonitoring() {
            try {
                const newStream: MediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
                setError(null);

                // We need to handle the double mounting of this component when is Strict Mode.
                // Strict Mode's second mounting overwrites streamRef, meaning we never stop all the tracks on it.
                // Without this, the browser will think we never stopped recording while is strict mode.
                if (abortController.signal.aborted) {
                    stopTracksOnStream(newStream);
                    return;
                }

                streamRef.current = newStream;
                const audioContext: AudioContext = new AudioContext();

                const analyser: AnalyserNode = audioContext.createAnalyser();
                analyser.fftSize = 2048;

                const microphone: MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(streamRef.current);
                microphone.connect(analyser);

                const bufferLength: number = analyser.frequencyBinCount;
                const dataArray: Uint8Array<ArrayBuffer> = new Uint8Array(bufferLength);

                const updateAudioLevels = () => {
                    analyser.getByteTimeDomainData(dataArray);      // This gets the current waveform

                    /* Calculate the average sound deviation to determine volume.

                    Values are centered around 128, where 128 represents the 0 on a waveform.
                    Both negative (below 128) and positive (above 128)  values represent "loudness."
                    Those values would cancel out in an average.

                    For example, 64 and 192 are part of the same loud sound wave.
                    Averaging them out would get us 128, which would inaccurately imply silence.

                    First, we normalize the values to be centered around 0 instead of 128.
                    We then get the absolute values and average those together to get the deviation.
                    The higher the deviation, the higher the volume.

                    The most accurate way of handling this would be by calculating the Root Mean Square (RMS).
                    This is super inefficient though, so I've swapped that out with the simpler absolute value method.
                     */
                    let sumOfAbsoluteDeviations: number = 0;
                    for (let i: number = 0; i < dataArray.length; i++) {
                        sumOfAbsoluteDeviations += Math.abs(dataArray[i] - 128);
                    }

                    // Normalize to 0-1 so we can use it as a percentage
                    const avgDeviation: number = sumOfAbsoluteDeviations / dataArray.length;
                    const avgDeviationPerc: number = avgDeviation / 128;

                    // Use logarithmic scaling so quiet sounds appear louder (since that's how we hear them)
                    const minimumDeviationPerc: number = 0.001;
                    const clampedDeviationPerc: number = Math.max(avgDeviationPerc, minimumDeviationPerc);
                    const decibelValue: number = 20 * Math.log10(clampedDeviationPerc);
                    const normalizedLevels: number = Math.max(0, Math.min(1, (decibelValue + 60) / 50));

                    setAudioLevel(normalizedLevels);
                }

                intervalId.current = window.setInterval(updateAudioLevels, 100);

            } catch (error) {
                if (error instanceof DOMException) {
                    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                        setError("Microphone permission denied. Without permissions, we cannot use the microphone.");
                    } else if (error.name === 'NotFoundError' || error.name === 'DeviceNotFoundError') {
                        setError("No microphone found. Please connect a microphone.");
                    } else {
                        setError(`Unexpected error accessing microphone! Details: ${error.message}`);
                        console.error("Unexpected error accessing microphone.", error);
                    }
                }
            }
        }

        const handleDeviceChange = () => {
            if (error) {
                initAudioMonitoring();
            }
        }

        navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);

        initAudioMonitoring();

        return () => {
            abortController.abort();

            navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);

            if (intervalId.current) {
                window.clearInterval(intervalId.current);
                intervalId.current = 0;
            }

            if (streamRef.current) {
                stopTracksOnStream(streamRef.current);
            }
        };
    }, [error]);


    function stopTracksOnStream(mediaStream: MediaStream) {
        mediaStream.getTracks().forEach(
            (track: MediaStreamTrack) => {
                track.stop()
            });
    }

    function getCircleSize(): string {
        const maxSizePx: number = 256;
        const minSizePx: number = 64;

        const audioBasedSizePx: number = (audioLevel * (maxSizePx - minSizePx)) + minSizePx;
        return `${audioBasedSizePx}px`
    }

    return (
        <Flex direction="column" m="4" justify="center" align="center" gap="5" minHeight="200px">
            {error ?
                <Callout.Root size="3" variant="soft" color="red">
                    <Flex direction="column" justify="center" align="center" gap="5">
                        <Callout.Icon> <i className="fa-solid fa-circle-exclamation fa-2xl"></i> </Callout.Icon>
                        <Callout.Text align="center">{error}</Callout.Text>
                    </Flex>
                </Callout.Root>
                :
                <>
                    <Box position="absolute" width={getCircleSize()} height={getCircleSize()} style={{
                        borderRadius: "100%",
                        backgroundColor: "var(--accent-5)",
                        transition: "width 50ms ease-out, height 50ms ease-out",
                        zIndex: -1
                    }}/>
                    <i className={`fa-solid fa-microphone fa-2xl`}></i>
                </>
            }
        </Flex>
    );
}