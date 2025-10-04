import Button from "@/components/button";
import PageContainer from "@/components/page-container";
import P from "@/components/paragraph";
import useTheme from "@/hooks/use-theme";

export default function SettingsScreen() {
    const { toggleTheme, isDarkMode } = useTheme();

    return (
        <PageContainer>
            <P>Settings</P>
            <Button
                onPress={toggleTheme}
                title={`Change to ${isDarkMode() ? "light" : "dark"} mode`}
            />
        </PageContainer>
    );
}
