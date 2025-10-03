import useTheme from "@/hooks/use-theme";
import { Text } from "react-native";

interface ParagraphProps {
    children: React.ReactNode;
    muted?: boolean | undefined;
}

export default function P({ children, muted }: ParagraphProps) {
    const { colors } = useTheme();

    return (
        <Text style={{ color: muted ? colors.textMuted : colors.text }}>
            {children}
        </Text>
    );
}