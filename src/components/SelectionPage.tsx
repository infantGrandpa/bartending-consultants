import {Button, Flex, Grid} from "@radix-ui/themes";
import {type Bartender, bartenders} from "../types/bartenders.ts";
import BartenderCard from "./bartenders/BartenderCard.tsx";
import {useBartender} from "../providers/BartenderProvider.tsx";
import {useNavigate} from "react-router";

export default function SelectionPage() {
    const {setSelectedBartender} = useBartender();
    let navigate = useNavigate();

    const bartenderArray = Object.values(bartenders);

    const handleSelect = (bartender: Bartender)=> {
        setSelectedBartender(bartender);
        navigate("/chat");
    }

    return (
        <Grid columns="3" gap="3" width="auto">
            {bartenderArray.map((thisBartender, index) => (
                <Flex key={index} direction="column" gap="3">
                    <BartenderCard key={index} bartender={thisBartender}/>
                    <Button onClick={() => handleSelect(thisBartender)}>Choose {thisBartender.profile.firstName}</Button>
                </Flex>
            ))}
        </Grid>
    )
}