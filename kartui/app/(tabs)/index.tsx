import Button from "@/components/button";
import PageContainer from "@/components/page-container";
import P from "@/components/paragraph";
import useTheme, { ColorScheme } from "@/hooks/use-theme";
import { useMemo } from "react";
import { Alert, StyleSheet } from "react-native";

export default function Index() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <PageContainer>
      <P>Your shopping lists:</P>
      <Button title="Primary" variant="primary" onPress={() => Alert.alert("How dare you!", "Who are you to click the primary button?")} />
      <Button title="Primary button disabled" variant="primary" disabled />
      <Button title="Secondary button" variant="secondary" />
      <Button title="Secondary button" variant="secondary" disabled />
      <Button title="Outlined button" variant="outlined" />
      <Button title="Outlined button" variant="outlined" disabled />
      <Button title="Ghost" variant="ghost" />
      <Button title="Ghost" variant="ghost" disabled />
    </PageContainer>
  );
}


function createStyles(colors: ColorScheme) {
  return StyleSheet.create({
    container: {
      padding: 16,
      height: "100%",
      color: colors.text,
      backgroundColor: colors.bg,
    }
  });
}
