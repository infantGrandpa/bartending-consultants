import {useState} from "react";

export default function BartenderDetails() {
    const [imageUrl] = useState(
        "https://placehold.co/574x861/030712/white?text=Choose+a+Bartender&font=roboto"
    );

    return (
        <img
            src={imageUrl}
            alt="Bartender"
            className="w-full max-h-[1000px] object-contain"
        />
    );
}