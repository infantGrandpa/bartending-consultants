import {useState, useEffect} from "react";
import {AlertDialog, Button, Card, Flex, Heading, Text} from "@radix-ui/themes";
import ApiKeyInput from "./ApiKeyInput.tsx";

export default function ApiKeysPanel() {
    const [openaiKey, setOpenaiKey] = useState("");
    const [elevenLabsKey, setElevenLabsKey] = useState("");
    const [areKeysSaved, setAreKeysSaved] = useState<boolean>(false);

    useEffect(() => {
        const storedOpenAI = localStorage.getItem("openaiApiKey") || "";
        const storedEleven = localStorage.getItem("elevenLabsApiKey") || "";

        if (storedOpenAI) {
            console.log(`Saved OpenAI Key found. Setting it to: ${storedOpenAI}`);
            setOpenaiKey(storedOpenAI);
        }

        if (storedEleven) {
            console.log(`Saved Eleven Key found. Setting it to: ${storedEleven}`);
            setElevenLabsKey(storedEleven);
        }

        setAreKeysSaved(Boolean(storedOpenAI && storedEleven));
    }, []);

    const handleSave = () => {
        console.log("Saving API Keys...");
        console.log(`OpenAI Key: ${openaiKey}`);
        console.log(`ElevenLabs Key: ${elevenLabsKey}`);
        if (openaiKey) localStorage.setItem("openaiApiKey", openaiKey);
        if (elevenLabsKey) localStorage.setItem("elevenLabsApiKey", elevenLabsKey);
        //TODO: Set Keys in useApiKeys

        setAreKeysSaved(true);
    };

    const handleClear = () => {
        localStorage.removeItem("openaiApiKey");
        localStorage.removeItem("elevenLabsApiKey");
        setOpenaiKey("");
        setElevenLabsKey("");

        setAreKeysSaved(false);
    };

    if (areKeysSaved) {
        return (
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" variant="outline">
                        Clear API Keys
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Clear Saved API Keys</AlertDialog.Title>
                    <AlertDialog.Description>
                        You cannot undo this action. If you want to connect with these awesome bartenders again, you'll
                        need to reenter your API keys.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color="red" onClick={handleClear}>
                                Clear Keys
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        )
    }

    return (
        <Card>
            <Heading as="h2" size="5" mb="1">API Key Setup</Heading>
            <Text as="p">Enter your API keys. They'll be stored locally in your browser.</Text>
            <ApiKeyInput
                id={"openaiApiKeyInput"}
                labelText={"OpenAI API Key"}
                placeholder={"sk-..."}
                onChange={(e: any) => setOpenaiKey(e.target.value)}
            />
            <ApiKeyInput
                id={"elevenLabsApiKeyInput"}
                labelText={"ElevenLabs API Key"}
                placeholder={"sk_..."}
                onChange={(e: any) => setElevenLabsKey(e.target.value)}
            />
            <Flex mt="4" justify="center">
                <Button onClick={handleSave}>
                    Save API Keys
                    <i className="fa-solid fa-floppy-disk"></i>
                </Button>
            </Flex>
        </Card>
    );
}
