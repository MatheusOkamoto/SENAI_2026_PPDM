import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import Logo from "../../assets/estacao.jpg";

export default function Registro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  function cadastrar() {
    if (senha !== confSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />

      <Text style={styles.title}>Cadastre-se</Text>

      <TextInput
        style={styles.input}
        placeholder="Insira seu e-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#888"
        value={confSenha}
        onChangeText={setConfSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Já tenho uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 20,
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#222",
    textAlign: "center",
    marginTop: 18,
    fontWeight: "bold",
  },
});