import {Dialog, Flex, IconButton, TabNav} from "@radix-ui/themes";
import ApiKeysSetup from "./ApiKeysSetup.tsx";
import {useState} from "react";
import DevControls from "./developer/DevControls.tsx";
import {useDevSettings} from "../../providers/DevSettingsProvider.tsx";

type SettingsTab = 'api-keys' | 'developer';

export default function Settings() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('api-keys');
    const {settings} = useDevSettings();

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <IconButton variant="soft" onClick={() => setActiveTab('api-keys')}>
                    <i className={settings.isDevMode ? "fa-solid fa-code" :  "fa-solid fa-gear"}></i>
                </IconButton>
            </Dialog.Trigger>


            <Dialog.Content maxWidth="500px" minHeight="400px">
                <Flex justify="between" align="center">
                    <Dialog.Title size={"6"} trim="both">Settings</Dialog.Title>
                    <Dialog.Close>
                        <IconButton size="2" variant="ghost" radius="full" color="gray" >
                            <i className="fa-solid fa-xmark"></i>
                        </IconButton>
                    </Dialog.Close>
                </Flex>
                <Dialog.Description size={"2"} mb="2">
                    Make changes to app settings.
                </Dialog.Description>
                <TabNav.Root>
                    <TabNav.Link
                        active={activeTab === 'api-keys'}
                        onClick={() => setActiveTab('api-keys')}
                    >
                        API Keys
                    </TabNav.Link>
                    <TabNav.Link
                        active={activeTab === 'developer'}
                        onClick={() => setActiveTab('developer')}
                    >
                        Developer
                    </TabNav.Link>
                </TabNav.Root>
                {activeTab === 'api-keys' && <ApiKeysSetup/>}
                {activeTab === 'developer' && <DevControls/>}
            </Dialog.Content>
        </Dialog.Root>
    )
}