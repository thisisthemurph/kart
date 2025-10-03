import useTheme from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    const { colors } = useTheme();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarStyle: {
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                height: 80,
                paddingTop: 10
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "600",
            }
        }}>
            <Tabs.Screen name="index" options={{
                title: "Lists",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="flash-outline" size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="settings" options={{
                title: "Settings",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings" size={size} color={color} />
                )
            }} />
        </Tabs>
    )
}
