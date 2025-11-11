import {Flex, Switch, Text} from '@radix-ui/themes';

interface LabelledSwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    label: string;
}

export function LabelledSwitch({checked, onCheckedChange, disabled = false, label}: LabelledSwitchProps) {
    return (
        <Text as="label" size="3" color={disabled ? "gray" : undefined}>
            <Flex gap="2">
                <Switch
                    size="2"
                    checked={checked}
                    onClick={() => onCheckedChange(!checked)}
                    disabled={disabled}
                />
                {label}
            </Flex>
        </Text>
    );
}