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
      paddingTop: 40,
      margin: 10,
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    promptContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      marginTop: 24,
      padding: 30,
      width: "90%",
      backgroundColor: currentTheme.primary,
      margin: "auto",
      fontSize: '3 em',
      color: currentTheme.fontColor
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
    <View style={(styles.container)}>
      <ScrollView>
        {songs?.length === 0 ? <Text>No Songs to browse. Answer the prompts first!</Text>  :
          songs?.map((song, i) => (
            <TouchableOpacity
              key={i}
              style = {{flex: 1, flexDirection: "row"}}
              onPress= {() => setCurrentSong(song)}
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
    </View>
  );
}