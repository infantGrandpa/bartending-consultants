import {Label} from "radix-ui";
import {Box, Text, TextField} from "@radix-ui/themes";
import * as React from "react";

interface Props {
    id: string;
    labelText: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    isSensitive?: boolean;
}

export default function ApiKeyInput({id, labelText, placeholder, onChange, value, isSensitive = true}:Props) {
    return (
        <Box mt="4">
            <Label.Root htmlFor={id}>
                <Text as="div" size="2" mb="1">{labelText}</Text>
            </Label.Root>
            <TextField.Root
                type={isSensitive ? "password" : "text"}
                placeholder={placeholder}
                id={id}
                onChange={onChange}
                value={value}
            />
        </Box>
    );
}