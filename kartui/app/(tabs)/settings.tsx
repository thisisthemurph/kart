import { StyleSheet, Text, View } from "react-native";

const data = [];

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text>This is the settings page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "lightgray",
    }
});
