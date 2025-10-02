import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "green",
            tabBarStyle: {
                backgroundColor: "#1e293b",
                borderTopWidth: 1,
                borderTopColor: "gray",
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
