import { StatusBar } from 'expo-status-bar';
import { Button, ButtonProps, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from "react";

interface Props {
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>
  toggleThemes: (theme: string) => void
  themes: Themes
};

type Song = {
  title?: string,
  artists?: [string],
  background?: string,
  duration?: number,
  rank?: number,
  preview?: string
};

type Themes = {
  [key: string]: {
    primary: string,
    secondary: string,
    background: string,
  },
};

export default function Prompts ({setSongs, toggleThemes, themes}: Props) {
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
      <View style={styles.promptContainer}>
        <Text>{prompts[index]}</Text>
        <TextInput
        defaultValue={answers[index] || userInput}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUserInput(userInput);
      }}
        />
        <Button
				title="Continue"
        onPress={() => {
          answers.push(userInput); 
          setIndex(index + 1);
          resetUserInput();
        }}/>
      </View>
      
      <StatusBar style="auto" />
    </View>
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