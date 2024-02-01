import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { useState } from "react";
import { Song } from "./CurrentComponent";
import { Theme } from "./App";
import { Popup } from './Popup';
import { getFontSize } from './tools/FontSizes';
// import {defaultSong} from './assets/default-song.png';
import { Image } from 'react-native-elements';

export interface BrowseProps {
  songs: Song[],
  currentTheme: Theme,
  children?: React.ReactNode
};

export const Browse  = ({songs, currentTheme}: BrowseProps) => {
  const screenWidth = Dimensions.get('window').width;
  console.log(screenWidth);
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
      display: "flex",
      backgroundColor: "rgba(200, 200, 200, .45)",  
      backgroundImage: `linear-gradient(to right, ${currentTheme.primaryTab}, ${currentTheme.secondaryTab})`,
      fontSize: '3 em',
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
      fontFamily: "Fira Sans",
      color: currentTheme.fontColor,
    },
    songImage: {
      width: 40,
      height: 40,
      marginRight: screenWidth > 900 ? 160 : 0,
    },
    songTexts: {
      flexDirection: "column",
      alignItems: "flex-end",
    },
    songTitle: {
      fontSize: getFontSize(24),
      marginBottom: 8,
      color: currentTheme.fontColor,
    },
    songArtist: {
      fontSize: getFontSize(16),
      marginTop: 8,
      color: currentTheme.fontColor,
    },
  });

  const [index, setIndex] = useState<number>(0);
  const [popupOn, setPopupOn] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<Song|null>(null); 
  console.log("songs")
  console.log(songs)
  console.log(songs.length)

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {songs?.length === 0 ? <Text style={{color: currentTheme.fontColor, fontSize: getFontSize(24)}}>No Songs to browse. Answer the prompts first!</Text>  :
          songs?.map((song, i) => (
            <TouchableOpacity
              key={i}
              onPress= {() => setCurrentSong(song)}
              style={styles.song}
            >
              <Image style={styles.songImage} source={require('./assets/default-song.png')} />
              <View style={styles.songTexts}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.songArtist}>{song.artist}</Text>
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