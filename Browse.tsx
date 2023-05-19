import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState, FC } from "react";
import PRIMARY_COLOR1 from "./styles.js";
import {Song, Theme} from "./App";
// import { StackScreenProps } from '@react-navigation/native'
// import { MyStackParamList } from './types'


interface BrowseProps {
  songs?: Song[],
  currentTheme: Theme
};

// type Song = {
//   title?: string,
//   artists?: string[],
//   background?: string,
//   duration?: number,
//   rank?: number,
//   preview?: string
// };

export const Browse: FC<BrowseProps> = ({songs, currentTheme}: BrowseProps) => {
  const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#222',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
      paddingTop: 40,
      paddingHorizontal: 20,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    promptContainer: {
      flex: 1,
      // backgroundImage: linear-gradient(PRIMARY_COLOR1, SECONDARY_COLOR1),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const [index, setIndex] = useState(0); 
  return (
    <View style={(styles.container)}>
      <ScrollView>
        {songs?.length === 0 ? <Text>No Songs to browse. Answer the prompts first!</Text>  :
          songs?.map((song, i) => (
            <TouchableOpacity
              key={i}
              style = {{flex: 1, flexDirection: "row"}}
              onPress= {() => {}}
            >
              <View>
                <Text>{song.title}</Text>
                <View>
                  {song.artists?.length !== 0 && song.artists?.map(artist => <Text>{artist}</Text>)}
                </View>
                <Text>{song.rank}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
}