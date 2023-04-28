import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from "react";

export default function App() {
  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const resetUserInput = () => setUserInput("");
  const prompts = [
    "Do you have any favorite artists or genres?",
    "What mood are you feeing right now?",
    "Do you want popular music?",
    "What era of music do you want to choose from?",
    "Are you looking for songs within a certain tempo?",
    "Are you looking for songs with certain instruments?"
  ]
  const answers = [

  ]
  return (
    <View style={styles.container}>
      <View style={styles.promptContainer}>
        <Text>{prompts[index]}</Text>
        <TextInput
        defaultValue={answers[index] || userInput}
        onChange={newInput => setUserInput(newInput)}
        />
        <Button
        onClick={() => {
          answers.push(userInput); 
          setIndex(index++);
          resetUserInput();
        }}>
          Continue
        </Button>
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
