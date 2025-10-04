import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/use-theme";
import { ReactNode } from "react";

interface PageContainerProps {
    children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
    const { theme } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, gap: 8, padding: 16, height: "100%", backgroundColor: theme.colors.card }}>
            {children}
        </SafeAreaView>
    );
}
