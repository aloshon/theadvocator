import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from "react";

export default function Browse({songs=[]}) {
  const [index, setIndex] = useState(0);
  return (
    songs.length === 0 ? <Text>No Songs to browse. Answer the prompts first!</Text>  :
    <>Hello!</>
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
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});