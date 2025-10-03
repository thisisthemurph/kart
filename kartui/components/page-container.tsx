import useTheme from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

interface PageContainerProps {
    children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
    const { colors } = useTheme();

    return (
        <LinearGradient colors={colors.gradients.background} style={{
            padding: 16, height: "100%"
        }}>
            <SafeAreaView style={{ flex: 1, gap: 8 }}>
                {children}
            </SafeAreaView>
        </LinearGradient>
    );
}
