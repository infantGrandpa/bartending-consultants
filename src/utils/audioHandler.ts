
let currentAudioElement = null;

async function playAudio(audioUrl: string) {
    currentAudioElement = new Audio(audioUrl);

    currentAudioElement.onended = () => {
        currentAudioElement = null;
        URL.revokeObjectURL(audioUrl);
    }

    await currentAudioElement.play()
}

export async function playAudioBlob(audioBlob: Blob) {
    const audioUrl = URL.createObjectURL(audioBlob)
    await playAudio(audioUrl)
}