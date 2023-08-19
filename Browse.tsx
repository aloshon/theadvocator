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
      // display: "flex",
      // // flexWrap: "wrap",
      // width: "100%",
      // margin: 4,
      display: "flex",
      flexWrap: "wrap"
    },
    song: {
      flexGrow: 1,
      flexBasis: 300,
      width: "100%",
      // margin: 12,
    },
    item: {
      padding: 30,
      // width: "100%",
      backgroundColor: currentTheme.primary,
      fontSize: '3 em',
      color: currentTheme.fontColor,
      // flexDirection: "row",
      display: "flex",
    },
    text: {
      fontFamily: "'Courier New', monospace",
      color: currentTheme.fontColor,
    }
  });

  const [index, setIndex] = useState(0);
  const [popupOn, setPopupOn] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<Song|null>(null); 

  return (
    <>
    <ScrollView style={styles.container}>
        {songs?.length === 0 ? <Text>No Songs to browse. Answer the prompts first!</Text>  :
          songs?.map((song, i) => (
            <TouchableOpacity
              key={i}
              onPress= {() => setCurrentSong(song)}
              style={styles.song}
            >
              <View style={(styles.item)}>
                <Text style={(styles.text)}>{song.title}</Text>
              </View>
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