import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export function AppButton({ title, onPress, variant = "primary" }) {
  const isSecondary = variant === "secondary";

  return (
    <TouchableOpacity
      style={[styles.button, isSecondary && styles.secondaryButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, isSecondary && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  secondaryButton: {
    backgroundColor: colors.primaryLight,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryText: {
    color: colors.primaryDark,
  },
});