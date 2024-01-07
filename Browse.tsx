import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { useState } from "react";
import { Song } from "./CurrentComponent";
import { Theme } from "./App";
import { Popup } from './Popup';
import { getFontSize } from './tools/FontSizes';

export interface BrowseProps {
  songs: Song[],
  currentTheme: Theme,
  children?: React.ReactNode
};

export const Browse  = ({songs, currentTheme}: BrowseProps) => {
  const styles = StyleSheet.create({
    container: {
      width: "100vw",
      height: "100vh",
      marginTop: 16,
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      justifyContent: 'center',
      flexWrap: "wrap",
      flexDirection: "row",
      flex: 1,
    },
    song: {
      backdropFilter: "saturate(200%) blur(25px)",
      flexGrow: 1,
      minWidth: "46%",
      maxWidth: "48%",
      height: "100px",
      margin: 20,
      padding: 30,
      backgroundColor: "rgba(200, 200, 200, .45)",  
      backgroundImage: `linear-gradient(to right, ${currentTheme.primaryTab}, ${currentTheme.secondaryTab})`,
      fontSize: '3 em',
      justifyContent: "center",
    },
    text: {
      fontFamily: "Fira Sans",
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