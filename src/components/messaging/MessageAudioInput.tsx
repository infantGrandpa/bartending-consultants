import {IconButton} from "@radix-ui/themes";

interface Props {
    onAudioTranscribed: (transcribedMessage: string) => Promise<void>
}

export default function MessageAudioInput({onAudioTranscribed}: Props) {

    const handleAudioTranscribed = async () => {
        await onAudioTranscribed("TEST: Audio message transcribed (not really).")
    }


    return(
        <IconButton radius="full" variant="solid"
                    style={{
                        color: "var(--gray-3)",
                        width: "64px",
                        height: "64px"
                    }}
                    onClick={handleAudioTranscribed}
        >
            <i className="fa-solid fa-microphone fa-xl"></i>
        </IconButton>
    )
}