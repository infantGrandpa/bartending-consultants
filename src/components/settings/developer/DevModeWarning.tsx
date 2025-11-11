import {Callout, Strong} from "@radix-ui/themes";


export default function DevModeWarning() {
    return (
        <Callout.Root size="2" color="yellow" variant="soft" role="alert" style={{
            flexGrow: "1"
        }}>
            <Callout.Icon>
                <i className="fa-solid fa-triangle-exclamation"></i>
            </Callout.Icon>
            <Callout.Text>
                <Strong>Warning: </Strong>Developer Mode Enabled
            </Callout.Text>
        </Callout.Root>
    )
}