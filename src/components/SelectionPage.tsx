import {Button, Flex, Grid} from "@radix-ui/themes";
import {type Bartender, bartenders} from "../types/bartenders.ts";
import BartenderCard from "./bartenders/BartenderCard.tsx";
import {useBartender} from "../providers/BartenderProvider.tsx";
import {useNavigate} from "react-router";
import Header from "./blocks/Header.tsx";
import Settings from "./settings/Settings.tsx";

export default function SelectionPage() {
    const {setSelectedBartender} = useBartender();
    let navigate = useNavigate();

    const bartenderArray = Object.values(bartenders);

    const handleSelect = (bartender: Bartender)=> {
        setSelectedBartender(bartender);
        navigate("/chat");
    }

    return (
        <>
            <Header
                leftSlot={<Settings ghostVariant={true}/>}
                headerText="Bartender"
            />
            <Grid columns={{initial: "1", md: "3"}} gap="3" width="auto" pt={"9"}>
                {bartenderArray.map((thisBartender, index) => (
                    <Flex key={index} direction="column" gap="3">
                        <BartenderCard key={index} bartender={thisBartender}/>
                        <Button
                            onClick={() => handleSelect(thisBartender)}>Choose {thisBartender.profile.firstName}</Button>
                    </Flex>
                ))}
            </Grid>
        </>
    )
}