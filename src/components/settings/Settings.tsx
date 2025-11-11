import {Dialog, IconButton, TabNav} from "@radix-ui/themes";
import ApiKeysCard from "./ApiKeysCard.tsx";
import {useState} from "react";
import DevControls from "./DevControls.tsx";

type SettingsTab = 'api-keys' | 'developer';

export default function Settings() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('api-keys');

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <IconButton variant="soft" onClick={() => setActiveTab('api-keys')}>
                    <i className="fa-solid fa-gear"></i>
                </IconButton>
            </Dialog.Trigger>


            <Dialog.Content maxWidth="500px" minHeight="400px">
                <Dialog.Title>Settings</Dialog.Title>
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
                {activeTab === 'api-keys' && <ApiKeysCard />}
                {activeTab === 'developer' && <DevControls />}
            </Dialog.Content>
        </Dialog.Root>
    )
}