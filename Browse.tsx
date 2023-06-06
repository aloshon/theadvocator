import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState, FC, useCallback } from "react";
import PRIMARY_COLOR1 from "./styles.js";
import {Song, Theme} from "./App";
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
    // container: {
    //   flex: 1,
    //   backgroundColor: '#222',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    container: {
      flex: 1,
      paddingTop: 40,
      margin: 10,
      paddingHorizontal: 20,
      // alignItems: 'center',
      justifyContent: 'center',
    },
    promptContainer: {
      flex: 1,
      // backgroundImage: linear-gradient(PRIMARY_COLOR1, SECONDARY_COLOR1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      marginTop: 24,
      padding: 30,
      width: "90%",
      backgroundColor: currentTheme.secondary,
      margin: "auto",
      fontSize: '3 em'
    },
    text: {
      fontFamily: "'Courier New', monospace",
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