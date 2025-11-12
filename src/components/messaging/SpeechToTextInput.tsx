import {IconButton} from "@radix-ui/themes";


export default function SpeechToTextInput() {
    const handleClick = () => {
        console.log("Starting Dictation (not really)...")
    }

    return (
        <IconButton variant="outline" onClick={handleClick}>
            <i className="fa-solid fa-microphone"></i>
        </IconButton>
    )
}