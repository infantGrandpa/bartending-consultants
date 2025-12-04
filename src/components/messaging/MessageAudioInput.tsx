import {IconButton} from "@radix-ui/themes";

export default function MessageAudioInput() {
    return(
        <IconButton radius="full" variant="solid"
                    style={{
                        color: "var(--gray-3)",
                        width: "64px",
                        height: "64px"
                    }}
                    onClick={() => console.log("Pretend we sent a message using STT.")}
        >
            <i className="fa-solid fa-microphone fa-xl"></i>
        </IconButton>
    )
}