import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { colors } from "../theme/colors";
import { Header } from "../components/Header";
import { MusicCard } from "../components/MusicCard";
import { useMusic } from "../context/MusicContext";

export default function FavoritesScreen() {
  const { favoriteMusics } = useMusic();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>

        <Header
          title="Suas favoritas"
          subtitle="Aqui aparecem apenas as músicas marcadas com coração."
        />

        {favoriteMusics.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={styles.emptyTitle}>Nenhuma música favorita</Text>
            <Text style={styles.emptyText}>
              Volte para a tela inicial e toque no coração de uma música.
            </Text>
          </View>
        ) : (
          <FlatList
            data={favoriteMusics}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MusicCard music={item} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  back: {
    color: colors.primary,
    fontWeight: "700",
    marginBottom: 18,
  },
  emptyBox: {
    backgroundColor: colors.card,
    padding: 24,
    borderRadius: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
  emptyText: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
  },
});