export default function PersonalitySelection() {
    const personalities = [
        { key: "salty", name: "The Classic" },
        { key: "flirty", name: "The Flirt" },
        { key: "showman", name: "The Showman" },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Choose Your Bartender:</h2>
            <div className="flex gap-4">
                {personalities.map((p) => (
                    <button
                        key={p.key}
                        className="personality-button bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold flex-1 border-2 border-transparent"
                        data-personality={p.key}
                    >
                        {p.name}
                    </button>
                ))}
            </div>
        </div>
    );
}