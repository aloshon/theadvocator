import { StatusBar } from 'expo-status-bar';
import { Button, ButtonProps, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, FC } from "react";
import {Song, Themes, Theme} from "./App";

interface PromptsProps {
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>
  toggleThemes: (theme: string) => void
  themes: Themes,
  currentTheme: Theme
};

export const Prompts: FC<PromptsProps> = ({setSongs, toggleThemes, themes, currentTheme}: PromptsProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      // backgroundColor: '#222', 
      alignItems: 'center',
      justifyContent: 'center',
      // height: "80vh",
      // width: "100%",
      flexDirection: 'column',
      textAlign: 'center',
      marginTop: '50px'
      
    },
    promptContainer: {
      display: "flex",
      // backgroundColor: '#444',
      alignItems: 'center',
      justifyContent: 'center', 
    },
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
  return (
    <View style={styles.container}>
      <Text style={styles.promptContainer}>{prompts[index]}</Text>
      <TextInput
        defaultValue={answers[index] || userInput}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUserInput(userInput);
      }}/>
      <Button
				title="Continue"
        onPress={() => {
          answers.push(userInput); 
          setIndex(index + 1);
          resetUserInput();
      }}/>
      <StatusBar style="auto" />
    </View>
  );
}