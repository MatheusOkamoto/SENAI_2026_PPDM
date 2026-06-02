import { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { colors } from "../theme/colors";
import { Header } from "../components/Header";
import { AppButton } from "../components/AppButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleLogin() {
    if (!email.includes("@")) {
      setError("Digite um e-mail válido.");
      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setError("");
    router.replace("/home");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header
        title="Entrar no Musicando"
        subtitle="Acesse suas músicas e favoritos."
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={colors.muted}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={colors.muted}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <AppButton title="Entrar" onPress={handleLogin} />

      <AppButton
        title="Criar conta"
        variant="secondary"
        onPress={() => router.push("/register")}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE7FB",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  input: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    fontSize: 15,
  },
  error: {
    width: "100%",
    maxWidth: 430,
    color: colors.error,
    marginBottom: 8,
  },
});