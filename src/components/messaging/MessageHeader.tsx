import {Card, Flex, Heading, IconButton} from "@radix-ui/themes";

interface Props {
    headerText: string;
}

export default function MessageHeader({headerText}: Props) {
    return (
        <Card style={{padding: "8px"}}>
            <Flex direction="row" justify="between" align="center">
                <IconButton variant="ghost" style={{paddingLeft: "8px"}}>
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