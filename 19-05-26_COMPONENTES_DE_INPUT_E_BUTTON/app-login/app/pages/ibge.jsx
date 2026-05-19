import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Logo from "../../assets/ibge.png";

export default function IBGEPesquisa() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [moradores, setMoradores] = useState("");

  function cadastrar() {
    console.log("Dados da pesquisa:");
    console.log({
      nome,
      idade,
      localidade,
      moradores,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.curvaTopo} />
      <View style={styles.curvaBaixo} />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Image source={Logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Pesquisa</Text>
        <Text style={styles.subtitle}>
          Preencha os dados abaixo para continuar
        </Text>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nome completo</Text>
            <Text style={styles.hint}>Informe como você prefere ser identificado</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Ana Souza"
              placeholderTextColor="#8BA7C8"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              accessibilityLabel="Campo de nome completo"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Idade</Text>
            <Text style={styles.hint}>Digite apenas números</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 30"
              placeholderTextColor="#8BA7C8"
              value={idade}
              onChangeText={setIdade}
              keyboardType="numeric"
              accessibilityLabel="Campo de idade"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Localidade</Text>
            <Text style={styles.hint}>Cidade, bairro ou região onde você mora</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Mirandópolis"
              placeholderTextColor="#8BA7C8"
              value={localidade}
              onChangeText={setLocalidade}
              autoCapitalize="words"
              accessibilityLabel="Campo de localidade"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Moradores na residência</Text>
            <Text style={styles.hint}>
              Quantas pessoas vivem na sua casa?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 4"
              placeholderTextColor="#8BA7C8"
              value={moradores}
              onChangeText={setMoradores}
              keyboardType="numeric"
              accessibilityLabel="Campo de quantidade de moradores"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={cadastrar}
            accessibilityRole="button"
            accessibilityLabel="Cadastrar pesquisa"
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: "100vh",
    backgroundColor: "#FFFFFF",
    position: "relative",
    overflow: "hidden",
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 72,
    paddingBottom: 60,
    paddingHorizontal: 28,
  },

  curvaTopo: {
    position: "absolute",
    top: -145,
    left: -120,
    width: 390,
    height: 310,
    backgroundColor: "#8EC9F3",
    borderBottomRightRadius: 260,
    zIndex: 0,
  },

  curvaBaixo: {
    position: "absolute",
    right: -130,
    bottom: -170,
    width: 430,
    height: 320,
    backgroundColor: "#8EC9F3",
    borderTopLeftRadius: 290,
    zIndex: 0,
  },

  logo: {
    width: 122,
    height: 122,
    marginBottom: 18,
    borderRadius: 20,
  },

  title: {
    fontSize: 38,
    color: "#2D507C",
    fontWeight: "500",
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 15,
    color: "#5D789B",
    textAlign: "center",
    marginBottom: 28,
  },

  form: {
    width: "100%",
    maxWidth: 315,
    zIndex: 2,
  },

  fieldGroup: {
    marginBottom: 19,
  },

  label: {
    fontSize: 16,
    color: "#213D63",
    fontWeight: "700",
    marginBottom: 3,
  },

  hint: {
    fontSize: 13,
    color: "#6E86A6",
    marginBottom: 8,
    lineHeight: 18,
  },

  input: {
    width: "100%",
    height: 58,
    borderWidth: 2.5,
    borderColor: "#49A2F2",
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    color: "#1F456F",
    backgroundColor: "#FFFFFF",
    shadowColor: "#49A2F2",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  button: {
    width: "100%",
    height: 66,
    borderRadius: 15,
    backgroundColor: "#1F78D8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    borderBottomWidth: 5,
    borderBottomColor: "#143F93",
    shadowColor: "#1F78D8",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.28,
    shadowRadius: 9,
    elevation: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});