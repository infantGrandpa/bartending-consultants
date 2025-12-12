import {useState, useEffect} from "react";
import {AlertDialog, Button, Flex, Text} from "@radix-ui/themes";
import ApiKeyInput from "./ApiKeyInput.tsx";
import {type AzureSttKeys, defaultAzureKeys, useApiKeys} from "../../providers/ApiKeyProvider.tsx";

export default function ApiKeysSetup() {
    const {openaiKey, elevenLabsKey, azureKeys, saveApiKeys, clearApiKeys, areKeysSaved} = useApiKeys();
    // Without separate state hooks, then typing in the field would save the keys.
    const [tempOpenaiKey, setTempOpenaiKey] = useState("");
    const [tempElevenLabsKey, setTempElevenLabsKey] = useState("");
    const [tempAzureKeys, setTempAzureKeys] = useState<AzureSttKeys>(defaultAzureKeys)


    useEffect(() => {
        const storedOpenAI = openaiKey;
        const storedEleven = elevenLabsKey;

        const storedAzureKeys = azureKeys;

        if (storedOpenAI) {
            setTempOpenaiKey(storedOpenAI);
        }

        if (storedEleven) {
            setTempElevenLabsKey(storedEleven);
        }

        setTempAzureKeys(storedAzureKeys);
    }, [openaiKey, elevenLabsKey, azureKeys]);

    const handleSave = () => {
        if (!tempOpenaiKey) {
            throw new Error("Open AI API Key is empty.")
        }

        if (!tempElevenLabsKey) {
            throw new Error("ElevenLabs API Key is empty.")
        }

        if (!tempAzureKeys.speechKey || !tempAzureKeys.endpoint || !tempAzureKeys.region) {
            throw new Error("At least 1 azure key value is empty.")
        }

        saveApiKeys(tempOpenaiKey, tempElevenLabsKey, tempAzureKeys);
    };

    const handleClear = () => {
        setTempOpenaiKey("");
        setTempElevenLabsKey("");
        setTempAzureKeys(defaultAzureKeys);
        clearApiKeys();
    };

    const canSaveKeys = () => {
        if (!tempOpenaiKey || !tempElevenLabsKey || !tempAzureKeys.speechKey || !tempAzureKeys.endpoint || !tempAzureKeys.region) {
            return false;
        }

        if (tempOpenaiKey !== openaiKey) {
            return true;
        }

        if (tempElevenLabsKey !== elevenLabsKey) {
            return true;
        }

        if (tempAzureKeys !== azureKeys) {
            return true;
        }

        return false;
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
            <ApiKeyInput
                id={"azureSpeechKeyInput"}
                labelText={"Azure Speech to Text API Key"}
                placeholder={"..."}
                onChange={(e: any) => setTempAzureKeys(
                    {...tempAzureKeys, speechKey: e.target.value}
                    )}
                value={tempAzureKeys.speechKey}
            />
            <ApiKeyInput
                id={"azureRegion"}
                labelText={"Azure Region"}
                placeholder={"eastus"}
                onChange={(e: any) => {
                    setTempAzureKeys(
                        {...tempAzureKeys, region: e.target.value}
                    )
                }}
                value={tempAzureKeys.region}
                isSensitive={false}
            />
            <ApiKeyInput
                id={"azureEndpoint"}
                labelText={"Azure Endpoint"}
                placeholder={""}
                onChange={(e: any) => {
                    setTempAzureKeys(
                        {...tempAzureKeys, endpoint: e.target.value}
                    )
                }}
                value={tempAzureKeys.endpoint}
                isSensitive={false}
            />


            <Flex mt="4" justify="between">
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Button color="red" variant="outline" disabled={!areKeysSaved()}>
                            Clear API Keys
                        </Button>
                    </AlertDialog.Trigger>

                    <AlertDialog.Content>
                        <AlertDialog.Title>Clear Saved API Keys</AlertDialog.Title>
                        <AlertDialog.Description>
                            <Text>
                                Are you sure? If you want to connect with these awesome bartenders again, you'll need to
                                reenter your API keys.
                            </Text>
                        </AlertDialog.Description>
                        <Text as="p" mt={"4"}>
                            You cannot undo this action.
                        </Text>

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

                <Button onClick={handleSave} disabled={!canSaveKeys()}>
                    Save API Keys
                    <i className="fa-solid fa-floppy-disk"></i>
                </Button>
            </Flex>
        </Flex>
    );
}
