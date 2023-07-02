import { StatusBar } from 'expo-status-bar';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, Animated, Easing } from 'react-native';
import { Keyframe, } from 'react-native-reanimated';
import { useState } from "react";
import { Song } from "./CurrentComponent";
import { Themes, Theme } from "./App";

export interface PromptsProps {
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>
  toggleThemes: (theme: string) => void
  currentTheme: Theme,
  children?: React.ReactNode
};

export const Prompts = ({setSongs, toggleThemes, currentTheme}: PromptsProps) => {
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
      margin: 12,
    },
    prompts: {
      fontSize: (width / 20),
      fontFamily: "Fira Sans",
      color: currentTheme.fontColor,
      margin: 12
    },
    promptsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 8,
      margin: 60,
      padding: 12,
      backgroundColor: currentTheme.secondaryTab,
      backdropFilter: "saturate(200%) blur(25px)",
    },
    inputBars: {
      borderRadius: 8,
      width: "90%",
      padding: "8px",
      border: `5px, solid, ${currentTheme.secondaryTab}`,
      margin: 12,
      boxSizing: "border-box",
      backgroundColor: currentTheme.secondaryTab,  
      backdropFilter: "saturate(100%) blur(15px)",
      color: currentTheme.fontColor
    },
    button: {
      borderRadius: 12,
      padding: 12,
      margin: 12,
      boxSizing: "border-box",
      backgroundColor: currentTheme.secondary,  
      backdropFilter: "saturate(100%) blur(15px)",
      display: "flex",
      alignItems: "center",
    },
  });

  const promptEnteringAnimation = new Keyframe({
    0: {
      opacity: 0,
      transform: translate3d()
    }
  })
  const promptExitingAnimation = new Keyframe({})

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
      <Animated.View>
        <View style={styles.promptsContainer}>
          <Text style={styles.prompts}>{prompts[index]}</Text>
          <TextInput
            style={styles.inputBars}
            placeholder="Enter your response here..."
            value={userInput}
            defaultValue={answers[index] || userInput}
            onChangeText={handleChange}
          />
        </View>
      </Animated.View>
      <Pressable
        style={({pressed}) => [{
          ...styles.button, backgroundColor: pressed ? currentTheme.secondaryTab 
            : currentTheme.secondary,
        }]}>
        <Text
          style={{color: currentTheme.fontColor, }}
          onPress={() => {
            answers.push(userInput); 
            resetUserInput();
            setIndex(index + 1);
        }}>
          CONTINUE
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}