import { useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Logo from "../../assets/icon.png";
import Background from "../../assets/background.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const mouseX = useRef(new Animated.Value(0)).current;
  const mouseY = useRef(new Animated.Value(0)).current;

  function handleMouseMove(event) {
    if (Platform.OS !== "web") return;

    const { clientX, clientY } = event.nativeEvent;

    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;

    Animated.spring(mouseX, {
      toValue: x,
      useNativeDriver: true,
      friction: 8,
      tension: 35,
    }).start();

    Animated.spring(mouseY, {
      toValue: y,
      useNativeDriver: true,
      friction: 8,
      tension: 35,
    }).start();
  }

  function LoginUser() {
    console.log("Dados do login:");
    console.log({ email, senha });
  }

  const bgX = mouseX.interpolate({
    inputRange: [-1, 1],
    outputRange: [-20, 20],
  });

  const bgY = mouseY.interpolate({
    inputRange: [-1, 1],
    outputRange: [-10, 10],
  });

  const panelX = mouseX.interpolate({
    inputRange: [-1, 1],
    outputRange: [10, -10],
  });

  const panelY = mouseY.interpolate({
    inputRange: [-1, 1],
    outputRange: [5, -5],
  });

  return (
    <View style={styles.screen} onMouseMove={handleMouseMove}>
      <Animated.View
        style={[
          styles.backgroundLayer,
          {
            transform: [
              { translateX: bgX },
              { translateY: bgY },
              { scale: 1.08 },
            ],
          },
        ]}
      >
        <ImageBackground
          source={Background}
          style={styles.background}
          resizeMode="cover"
        />
      </Animated.View>

      <View style={styles.overlay} />

      <View style={styles.topbar}>
        <Text style={styles.brand}>LOGIN</Text>
      </View>

      <Animated.View
        style={[
          styles.panel,
          {
            transform: [{ translateX: panelX }, { translateY: panelY }],
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.accessTag}>ACESSO SEGURO</Text>

          <Image source={Logo} style={styles.logo} resizeMode="cover" />

          <Text style={styles.title}>Conecte-se</Text>
          <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seuemail@exemplo.com"
          placeholderTextColor="#AEB8B6"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          accessibilityLabel="Campo de e-mail"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#AEB8B6"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          accessibilityLabel="Campo de senha"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={LoginUser}
          accessibilityRole="button"
          accessibilityLabel="Entrar no sistema"
        >
          <Text style={styles.buttonText}>Entrar no sistema</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: "100vh",
    backgroundColor: "#071013",
    overflow: "hidden",
  },

  backgroundLayer: {
    position: "absolute",
    width: "110%",
    height: "110%",
    left: "-5%",
    top: "-5%",
  },

  background: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(3, 6, 8, 0.58)",
  },

  topbar: {
    position: "absolute",
    top: 28,
    left: 34,
    right: 34,
    height: 56,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.16)",
  },

  brand: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 12,
  },

  panel: {
    position: "absolute",
    top: "19%",
    alignSelf: "center",
    width: 440,
    maxWidth: "86%",
    backgroundColor: "rgba(2, 6, 8, 0.84)",
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    zIndex: 30,
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 18 },
  },

  header: {
    alignItems: "center",
  },

  accessTag: {
    backgroundColor: "#FFFFFF",
    color: "#111111",
    paddingHorizontal: 18,
    paddingVertical: 8,
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 20,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 18,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    color: "#D8E0DE",
    fontSize: 15,
    textAlign: "center",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginVertical: 24,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    backgroundColor: "rgba(0, 0, 0, 0.42)",
    color: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 14,
  },

  button: {
    height: 54,
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#05090B",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
});