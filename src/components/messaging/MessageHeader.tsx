import {Card, Flex, Heading, IconButton} from "@radix-ui/themes";
import {useNavigate} from "react-router";
import {useBartender} from "../../providers/BartenderProvider.tsx";

interface Props {
    headerText: string;
}

export default function MessageHeader({headerText}: Props) {
    const {setSelectedBartender} = useBartender();
    let navigate = useNavigate();

    const handleReturn = () => {
        setSelectedBartender(null);
        navigate("/");
    }

    return (
        <Card style={{padding: "8px"}}>
            <Flex direction="row" justify="between" align="center">
                <IconButton onClick={handleReturn} variant="ghost" style={{paddingLeft: "8px"}}>
                    <i className="fa-solid fa-chevron-left"></i>
                </IconButton>
                <Heading as="h1" size="5" style={{lineHeight: "0"}}>
                    {headerText}
                </Heading>
                <IconButton variant="ghost">
                    <i className="fa-solid fa-martini-glass"></i>
                </IconButton>
            </Flex>
        </Card>
    );
}