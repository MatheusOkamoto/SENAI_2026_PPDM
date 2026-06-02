import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { colors } from "../theme/colors";
import { layout } from "../theme/layout";
import { Header } from "../components/Header";
import { MusicCard } from "../components/MusicCard";
import { useMusic } from "../context/MusicContext";

export default function HomeScreen() {
  const { musics, favoriteMusics, currentMusic, isPlaying } = useMusic();

  const rockCount = musics.filter((music) => music.genre === "Rock").length;
  const mpbCount = musics.filter((music) => music.genre === "MPB").length;

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.phone}>
        <FlatList
          data={musics}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Header
                title="Sua trilha começa aqui"
                subtitle="Uma curadoria com clássicos da MPB, rock nacional e rock internacional."
              />

              <View style={styles.hero}>
                <Text style={styles.heroLabel}>Playlist em destaque</Text>
                <Text style={styles.heroTitle}>Clássicos para ouvir hoje</Text>
                <Text style={styles.heroText}>
                  Chico, Caetano, Legião, Beatles, Stones, CBJR e mais.
                </Text>

                <TouchableOpacity style={styles.heroButton}>
                  <Text style={styles.heroButtonText}>▶ Tocar seleção</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionCard}
                  onPress={() => router.push("/favorites")}
                >
                  <Text style={styles.actionIcon}>♥</Text>
                  <Text style={styles.actionTitle}>Favoritos</Text>
                  <Text style={styles.actionText}>
                    {favoriteMusics.length} música(s)
                  </Text>
                </TouchableOpacity>

                <View style={styles.actionCard}>
                  <Text style={styles.actionIcon}>🎸</Text>
                  <Text style={styles.actionTitle}>Rock</Text>
                  <Text style={styles.actionText}>{rockCount} faixas</Text>
                </View>

                <View style={styles.actionCard}>
                  <Text style={styles.actionIcon}>🎙️</Text>
                  <Text style={styles.actionTitle}>MPB</Text>
                  <Text style={styles.actionText}>{mpbCount} faixas</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Músicas disponíveis</Text>
            </>
          }
          renderItem={({ item }) => <MusicCard music={item} />}
          ListFooterComponent={
            <>
              {currentMusic && (
                <TouchableOpacity
                  style={styles.miniPlayer}
                  onPress={() =>
                    router.push({
                      pathname: "/player",
                      params: { id: currentMusic.id },
                    })
                  }
                >
                  <Image source={{ uri: currentMusic.image }} style={styles.miniCover} />

                  <View style={styles.miniInfo}>
                    <Text numberOfLines={1} style={styles.miniTitle}>
                      {currentMusic.title}
                    </Text>
                    <Text numberOfLines={1} style={styles.miniArtist}>
                      {currentMusic.artist}
                    </Text>
                  </View>

                  <Text style={styles.miniStatus}>{isPlaying ? "⏸" : "▶"}</Text>
                </TouchableOpacity>
              )}

              <View style={styles.bottomSpace} />
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#EDE7FB",
    alignItems: "center",
  },
  phone: {
    flex: 1,
    width: "100%",
    maxWidth: layout.maxWidth,
    backgroundColor: colors.background,
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
  },
  heroLabel: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    lineHeight: 30,
  },
  heroText: {
    color: "#EEE7FF",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  heroButton: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 18,
  },
  heroButtonText: {
    color: colors.primaryDark,
    fontWeight: "900",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 13,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  actionIcon: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },
  actionTitle: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 13,
  },
  actionText: {
    color: colors.muted,
    marginTop: 3,
    fontSize: 11,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 12,
  },
  miniPlayer: {
    backgroundColor: colors.primaryDark,
    borderRadius: 22,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  miniCover: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
miniCover: {
  width: 46,
  height: 46,
  borderRadius: 15,
  backgroundColor: colors.primary,
  marginRight: 12,
},
  miniInfo: {
    flex: 1,
  },
  miniTitle: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 14,
  },
  miniArtist: {
    color: "#DDD6FE",
    fontSize: 12,
    marginTop: 3,
  },
  miniStatus: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },
  bottomSpace: {
    height: 24,
  },
});