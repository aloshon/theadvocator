import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from "react";
import {PRIMARY_COLOR1} from "./styles.js";

export default function Browse({songs=[]}) {
  const [index, setIndex] = useState(0); 
  return (
    songs.length === 0 ? <Text>No Songs to browse. Answer the prompts first!</Text>  :
    songs.map(song => (
        <View>
            {song.name}
        </View>
    ))
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptContainer: {
    flex: 1,
    backgroundImage: linear-gradient(PRIMARY_COLOR1, SECONDARY_COLOR1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});