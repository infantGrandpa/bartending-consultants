import {Card, Text} from "@radix-ui/themes";


interface Props {
    message: string;
    sender: string;
    onLeftSide: boolean;
}

export default function Message({message, sender, onLeftSide}: Props) {
    return (
        <Card style={{minWidth: "40%", maxWidth: "60%", alignSelf: onLeftSide ? "start" : "end"}}>
            <Text as="div" size="2" weight="bold" align={onLeftSide ? "left" : "right"}>{sender}</Text>
            <Text as="div" size="2" color="gray" align={onLeftSide ? "left" : "right"}>{message}</Text>
        </Card>
    );
}