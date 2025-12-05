import {Box, Card, Flex, Heading, IconButton} from "@radix-ui/themes";
import {useNavigate} from "react-router";
import {useBartender} from "../../providers/BartenderProvider.tsx";
import {useMessageSidebar} from "../../providers/MessageSidebarProvider.tsx";

interface Props {
    headerText: string;
}

export default function MessageHeader({headerText}: Props) {
    const {setSelectedBartender} = useBartender();
    const {openSidebar} = useMessageSidebar();
    let navigate = useNavigate();

    const handleReturn = () => {
        setSelectedBartender(null);
        navigate("/");
    }

    return (
        <Box position="fixed" p="3" top="0" left="0" width="100%" style={{zIndex: "1"}}>
            <Card>
                <Flex direction="row" justify="between" align="center">
                    <IconButton onClick={handleReturn} variant="ghost" style={{paddingLeft: "8px"}}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </IconButton>
                    <Heading as="h1" size="5" style={{lineHeight: "0"}}>
                        {headerText}
                    </Heading>
                    <IconButton variant="ghost" onClick={openSidebar}>
                        <i className="fa-solid fa-martini-glass"></i>
                    </IconButton>
                </Flex>
            </Card>
        </Box>
    );
}