import type {ReactNode} from "react";
import {Box, Card, Flex} from "@radix-ui/themes";

interface Props {
    children: ReactNode
}

export default function Header({children}: Props) {
    return (
        <Box position="fixed" p="3" top="0" left="0" width="100%" style={{zIndex: "1"}}>
            <Card>
                <Flex direction="row" justify="between" align="center">
                    {children}
                </Flex>
            </Card>
        </Box>
    )
}
