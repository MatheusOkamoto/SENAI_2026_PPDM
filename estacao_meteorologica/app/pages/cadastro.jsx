import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Cadastro() {
  const [temp, setTemp] = useState("");
  const [hum, setHum] = useState("");
  const [kmVento, setKmVento] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de medição</Text>

      <TextInput
        style={styles.input}
        placeholder="Temperatura ºC"
        placeholderTextColor="#888"
        value={temp}
        onChangeText={setTemp}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Umidade %"
        placeholderTextColor="#888"
        value={hum}
        onChangeText={setHum}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Km vento"
        placeholderTextColor="#888"
        value={kmVento}
        onChangeText={setKmVento}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar medição</Text>
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
  title: {
    fontSize: 30,
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
});