import useTheme from "@/hooks/use-theme";
import { Text } from "react-native";
import { ReactNode } from "react";

interface ParagraphProps {
    children: ReactNode;
    muted?: boolean | undefined;
}

export default function P({ children, muted }: ParagraphProps) {
    const { theme } = useTheme();

    return (
        <Text style={{ color: muted ? theme.colors.mutedForeground : theme.colors.foreground }}>
            {children}
        </Text>
    );
}