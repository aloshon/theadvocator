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
      flex: 1,
      order: 2,
      paddingTop: 40,
      margin: 12,
      width: "80%",
      paddingHorizontal: 20,
      // justifyContent: 'center',
      // flexDirection: "column",
      alignItems: "center",
      // alignItems: "flex-start",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    song: {
      minWidth: "49%",
      height: 100,
      margin: 1,
    },
    item: {
      marginTop: 24,
      padding: 30,
      minwWidth: "100%",
      backgroundColor: currentTheme.primary,

      fontSize: '3 em',
      color: currentTheme.fontColor,
      flex: 1, 
      flexDirection: "row",
      display: "flex",
      // flexBasis: '50%',
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
    <ScrollView>
      <View style={(styles.container)}>
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
      </View>
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