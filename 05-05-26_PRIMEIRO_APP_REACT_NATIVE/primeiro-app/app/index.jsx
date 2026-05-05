import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Foto from "../assets/Foto.png";

export default function Index() {
  return (
    <ScrollView style={estilos.tela}>
      <View style={estilos.container}>
        <Text style={estilos.titulo}>My First App</Text>

        <Image source={Foto} style={estilos.imagem} />

        <View style={estilos.card}>
          <Text style={estilos.tituloCard}>Sobre o App</Text>
          <Text style={estilos.texto}>
            Aplicativo desenvolvido por estudantes do SESI Mirandópolis para
            aprendizado do framework React Native.
          </Text>
        </View>

        <View style={estilos.card}>
          <Text style={estilos.tituloCard}>O que aprenderemos</Text>
          <Text style={estilos.item}>- Layout Responsivo</Text>
          <Text style={estilos.item}>- Push Notification</Text>
          <Text style={estilos.item}>- Acesso a APIs</Text>
        </View>

        <View style={estilos.card}>
          <Text style={estilos.tituloCard}>O que precisamos</Text>
          <Text style={estilos.item}>- Node js</Text>
          <Text style={estilos.item}>- VS Code</Text>
          <Text style={estilos.item}>- Foco, força e fé</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    backgroundColor: "#eef2f7",
  },

  container: {
    padding: 22,
    alignItems: "center",
    backgroundColor: "#ffffd6",
  },

  titulo: {
    color: "#0f172a",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 35,
    marginBottom: 22,
    textAlign: "center",
  },

  imagem: {
    width: 370,
    height: 230,
    borderRadius: 24,
    marginBottom: 28,
  },

  card: {
    width: "100%",
    backgroundColor: "#fef9ec",
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 5,
  },

  tituloCard: {
    color: "#1e293b",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 10,
  },

  texto: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
  },

  item: {
    color: "#334155",
    fontSize: 16,
    lineHeight: 25,
  },
});
