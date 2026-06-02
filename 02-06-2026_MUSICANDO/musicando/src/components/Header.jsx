import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export function Header({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>♪</Text>
        </View>

        <View>
          <Text style={styles.logo}>Musicando</Text>
          <Text style={styles.tagline}>MPB & Rock</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 22,
  },
  logoBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },
  logo: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
  },
  tagline: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 8,
    lineHeight: 21,
  },
});