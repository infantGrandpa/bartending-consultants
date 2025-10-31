import PersonalitySelection from "./PersonalitySelection";
import BartenderImage from "./BartenderDetails";
import ApiKeysPanel from "./ApiKeys";

export default function Sidebar() {
    return (
        <div className="p-8 min-h-screen border-e-2 border-gray-800 border-solid bg-gray-950 shadow-2xl shadow-black flex flex-col justify-between">
            <div>
                <PersonalitySelection />
                <BartenderImage />
            </div>
            <ApiKeysPanel />
        </div>
    );
}