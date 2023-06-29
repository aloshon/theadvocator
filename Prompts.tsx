import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from "react";
import {Song, Themes, Theme} from "./CurrentComponent";
import { Dimensions } from 'react-native';

export interface PromptsProps {
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>
  toggleThemes: (theme: string) => void
  themes: Themes,
  currentTheme: Theme,
  children?: React.ReactNode
};

export const Prompts = ({setSongs, toggleThemes, themes, currentTheme}: PromptsProps) => {
  console.log(currentTheme.secondary);
  const { width } = Dimensions.get('window');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      // backgroundColor: '#222', 
      alignItems: 'center',
      // height: "80vh",
      // width: "100%",
      flexDirection: 'column',
      textAlign: 'center',
      margin: 12
    },
    prompts: {
      fontSize: (width / 32),
      fontFamily: "Fira Sans",
      margin: 60
    },
    inputBars: {
      borderRadius: 8,
      width: "100%",
      padding: "8px",
      margin: "8px",
      boxSizing: "border-box",
      backgroundColor: "rgba(200, 200, 200, .45)",  
      backdropFilter: "saturate(200%) blur(25px)",
    }
  });

  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const resetUserInput = () => setUserInput("");
  const prompts = [
    "Do you have any favorite artists or genres?",
    "What mood are you feeling right now?",
    "Do you want popular music?",
    "What era of music do you want to choose from?",
    "Are you looking for songs within a certain tempo?",
    "Are you looking for songs with certain instruments?"
  ];
  const answers:string[] = [

  ];
  const handleChange = (text: string) => {
    setUserInput(text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.prompts}>{prompts[index]}</Text>
      <TextInput
        style={styles.inputBars}
        value={userInput}
        defaultValue={answers[index] || userInput}
        onChangeText={handleChange}/>
      <Button
				title="Continue"
        onPress={() => {
          answers.push(userInput); 
          resetUserInput();
          setIndex(index + 1);
      }}/>
      <StatusBar style="auto" />
    </View>
  );
}