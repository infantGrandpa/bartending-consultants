import {Card, Text} from "@radix-ui/themes";


interface Props {
    message: string;
    sender: string;
}

export default function Message({message, sender}: Props) {
    return (
        <Card>
            <Text as="div" size="2" weight="bold">{sender}</Text>
            <Text as="div" size="2" color="gray">{message}</Text>
        </Card>
    );
}