import type {ReactNode} from "react";
import {Heading, Box, Card, Flex, Slot} from "@radix-ui/themes";

interface Props {
    leftSlot?: ReactNode,
    headerText: string,
    rightSlot?: ReactNode
}

export default function Header({leftSlot, headerText, rightSlot}: Props) {
    return (
        <Box position="sticky" py="3" top="0" left="0" width="100%" style={{zIndex: "1"}}>
            <Card>
                <Flex direction="row" justify="between" align="center">
                    {leftSlot ? <Slot>{leftSlot}</Slot> : <Box style={{minWidth: "30px"}}></Box>}
                    <Heading as="h1" size="5" align="center" style={{lineHeight: "0"}}>{headerText}</Heading>
                    {rightSlot ? <Slot>{rightSlot}</Slot> : <Box style={{minWidth: "30px"}}></Box>}
                </Flex>
            </Card>
        </Box>
    )
}
