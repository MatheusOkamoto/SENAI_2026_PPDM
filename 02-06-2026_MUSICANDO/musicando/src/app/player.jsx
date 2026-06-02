import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { colors } from "../theme/colors";
import { useMusic } from "../context/MusicContext";

export default function PlayerScreen() {
  const { id } = useLocalSearchParams();

  const {
    musics,
    currentMusic,
    isPlaying,
    favoriteIds,
    playMusic,
    togglePlayPause,
    toggleFavorite,
  } = useMusic();

  const musicFromRoute = musics.find((music) => music.id === id);
  const music = currentMusic || musicFromRoute;

  useEffect(() => {
    if (musicFromRoute) {
      playMusic(musicFromRoute);
    }
  }, [id]);

  if (!music) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Música não encontrada</Text>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>← Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isFavorite = favoriteIds.includes(music.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.playerCard}>
          <Image source={{ uri: music.image }} style={styles.coverImage} />

          <Text style={styles.nowPlaying}>
            {isPlaying ? "Tocando agora" : "Reprodução pausada"}
          </Text>

          <Text style={styles.title}>{music.title}</Text>
          <Text style={styles.artist}>{music.artist}</Text>
          <Text style={styles.album}>{music.album}</Text>
          <Text style={styles.genre}>{music.genre}</Text>

          <View style={styles.progressBar}>
            <View
              style={[styles.progress, { width: isPlaying ? "62%" : "35%" }]}
            />
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.time}>1:42</Text>
            <Text style={styles.time}>{music.duration}</Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton}>
              <Text style={styles.controlText}>⏮</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainControlButton}
              onPress={togglePlayPause}
            >
              <Text style={styles.mainControlText}>
                {isPlaying ? "⏸" : "▶"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton}>
              <Text style={styles.controlText}>⏭</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(music.id)}
          >
            <Text style={styles.favoriteText}>
              {isFavorite
                ? "💜 Remover dos favoritos"
                : "🤍 Adicionar aos favoritos"}
            </Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 24,
  },
  playerCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  coverImage: {
  width: 210,
  height: 210,
  borderRadius: 28,
  marginBottom: 22,
  backgroundColor: colors.primaryLight,
},
  nowPlaying: {
    color: colors.primary,
    fontWeight: "800",
    marginBottom: 10,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },
  artist: {
    color: colors.muted,
    fontSize: 18,
    marginTop: 6,
    textAlign: "center",
  },
  album: {
    color: colors.primaryDark,
    marginTop: 6,
    textAlign: "center",
  },
  genre: {
    color: colors.primary,
    marginTop: 6,
    fontWeight: "700",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    marginTop: 34,
  },
  progress: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  timeRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  time: {
    color: colors.muted,
    fontSize: 12,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    marginTop: 34,
  },
  controlButton: {
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: 40,
  },
  controlText: {
    fontSize: 24,
  },
  mainControlButton: {
    backgroundColor: colors.primary,
    padding: 22,
    borderRadius: 50,
  },
  mainControlText: {
    fontSize: 30,
  },
  favoriteButton: {
    marginTop: 32,
    padding: 14,
  },
  favoriteText: {
    color: colors.primaryDark,
    fontWeight: "700",
  },
});