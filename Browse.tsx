import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { useState } from "react";
import { Song } from "./CurrentComponent";
import { Theme } from "./App";
import { Popup } from './Popup';

export interface BrowseProps {
  songs: Song[],
  currentTheme: Theme,
  children?: React.ReactNode
};

export const Browse  = ({songs, currentTheme}: BrowseProps) => {
  console.log(currentTheme);
  console.log(songs);
  const styles = StyleSheet.create({
    container: {
      width: "100vw",
      height: "100%",
      marginTop: 16,
      // display: "flex",
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      flexWrap: "wrap",
      flexDirection: "row",
      flex: 1,
    },
    song: {
      flexGrow: 1,
      // aspectRatio: "auto",
      // flexBasis: 300,
      minwWidth: "36%",
      height: "12%",
      margin: 20,
      padding: 30,
      backgroundColor: currentTheme.primary,
      fontSize: '3 em',
      justifyContent: "center",
      // flexDirection: "column",
      // flexWrap: "wrap",
      flex: 1,
      // display: "flex",
    },
    text: {
      fontFamily: "'Courier New', monospace",
      color: currentTheme.fontColor,
    }
  });

  const [index, setIndex] = useState<number>(0);
  const [popupOn, setPopupOn] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<Song|null>(null); 

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {songs?.length === 0 ? <Text>No Songs to browse. Answer the prompts first!</Text>  :
          songs?.map((song, i) => (
            <TouchableOpacity
              key={i}
              onPress= {() => setCurrentSong(song)}
              style={styles.song}
            >
              <Text style={(styles.text)}>{song.title}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      {currentSong !== null && <Popup
        key="popup"
        data={currentSong}
        handleClose={() => setPopupOn(false)}
        currentTheme={currentTheme}
      />}
    </>
  );
}