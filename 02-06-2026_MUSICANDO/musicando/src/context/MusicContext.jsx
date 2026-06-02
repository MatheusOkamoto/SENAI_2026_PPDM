import React, { createContext, useContext, useState } from "react";
import { musics } from "../data/musics";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggleFavorite(musicId) {
    setFavoriteIds((previousFavorites) => {
      if (previousFavorites.includes(musicId)) {
        return previousFavorites.filter((id) => id !== musicId);
      }

      return [...previousFavorites, musicId];
    });
  }

  function playMusic(music) {
    setCurrentMusic(music);
    setIsPlaying(true);
  }

  function togglePlayPause() {
    setIsPlaying((previousState) => !previousState);
  }

  const favoriteMusics = musics.filter((music) =>
    favoriteIds.includes(music.id)
  );

  return (
    <MusicContext.Provider
      value={{
        musics,
        favoriteIds,
        favoriteMusics,
        currentMusic,
        isPlaying,
        toggleFavorite,
        playMusic,
        togglePlayPause,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}