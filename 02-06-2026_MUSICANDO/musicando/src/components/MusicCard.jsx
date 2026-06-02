import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { colors } from "../theme/colors";
import { useMusic } from "../context/MusicContext";

export function MusicCard({ music, compact = false }) {
  const { favoriteIds, toggleFavorite, playMusic } = useMusic();

  const isFavorite = favoriteIds.includes(music.id);

  function handlePlay() {
    playMusic(music);

    router.push({
      pathname: "/player",
      params: { id: music.id },
    });
  }

  return (
    <View style={[styles.card, compact && styles.compactCard]}>
      <TouchableOpacity style={styles.infoArea} onPress={handlePlay}>
        <Image source={{ uri: music.image }} style={styles.coverImage} />

        <View style={styles.textArea}>
          <Text numberOfLines={1} style={styles.title}>
            {music.title}
          </Text>

          <Text numberOfLines={1} style={styles.artist}>
            {music.artist}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.genre}>{music.genre}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.duration}>{music.duration}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(music.id)}
      >
        <Text style={styles.favorite}>{isFavorite ? "♥" : "♡"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 22,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primaryLight,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  compactCard: {
    marginBottom: 10,
  },
  infoArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  coverImage: {
    width: 58,
    height: 58,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: colors.primaryLight,
  },
  textArea: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  artist: {
    color: colors.muted,
    marginTop: 3,
    fontSize: 13,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 5,
  },
  genre: {
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: "800",
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  dot: {
    color: colors.muted,
    fontSize: 12,
  },
  duration: {
    color: colors.muted,
    fontSize: 12,
  },
  favoriteButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  favorite: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: "900",
  },
});