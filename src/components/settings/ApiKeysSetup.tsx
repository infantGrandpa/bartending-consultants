import {useState, useEffect} from "react";
import {AlertDialog, Button, Flex, Text} from "@radix-ui/themes";
import ApiKeyInput from "./ApiKeyInput.tsx";
import {useApiKeys} from "../../providers/ApiKeyProvider.tsx";

export default function ApiKeysSetup() {
    const {openaiKey, elevenLabsKey, saveApiKeys, clearApiKeys, areKeysSaved} = useApiKeys();
    // Without separate state hooks, then typing in the field would save the keys.
    const [tempOpenaiKey, setTempOpenaiKey] = useState("");
    const [tempElevenLabsKey, setTempElevenLabsKey] = useState("");

    useEffect(() => {
        const storedOpenAI = openaiKey;
        const storedEleven = elevenLabsKey;

        if (storedOpenAI) {
            setTempOpenaiKey(storedOpenAI);
        }

        if (storedEleven) {
            setTempElevenLabsKey(storedEleven);
        }
    }, []);

    const handleSave = () => {
        if (!tempOpenaiKey) {
            throw new Error("Open AI API Key is empty.")
        }

        if (!tempElevenLabsKey) {
            throw new Error("ElevenLabs API Key is empty.")
        }

        saveApiKeys(tempOpenaiKey, tempElevenLabsKey);
    };

    const handleClear = () => {
        setTempOpenaiKey("");
        setTempElevenLabsKey("");
        clearApiKeys();
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
        <Flex direction="column">
            <Text as="p" size="2" style={{
                paddingTop: "0.5rem"
            }}>
                Enter your API keys. They'll be stored locally in your browser.
            </Text>
            <ApiKeyInput
                id={"openaiApiKeyInput"}
                labelText={"OpenAI API Key"}
                placeholder={"sk-..."}
                onChange={(e: any) => setTempOpenaiKey(e.target.value)}
                value={tempOpenaiKey}
            />
            <ApiKeyInput
                id={"elevenLabsApiKeyInput"}
                labelText={"ElevenLabs API Key"}
                placeholder={"sk_..."}
                onChange={(e: any) => setTempElevenLabsKey(e.target.value)}
                value={tempElevenLabsKey}
            />
            <Flex mt="4" justify="between">
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Button color="red" variant="outline" disabled={!areKeysSaved}>
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

                    Save API Keys
                    <i className="fa-solid fa-floppy-disk"></i>
                </Button>
            </Flex>
        </Flex>
    );
}
