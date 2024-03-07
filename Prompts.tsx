import { StatusBar } from 'expo-status-bar';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, Animated, PixelRatio, Platform, ActivityIndicator } from 'react-native';
import { Keyframe, FadingTransition } from 'react-native-reanimated';
import { useState, useEffect, useRef } from "react";
import { Song } from "./CurrentComponent";
import { Theme } from "./App";
import { getFontSize } from './tools/FontSizes';
import { Button } from 'react-native-elements';
import { isStringLiteral } from 'typescript';

export interface PromptsProps {
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>
  toggleThemes: (theme: string) => void
  currentTheme: Theme,
  children?: React.ReactNode 
};

export const Prompts = ({setSongs, toggleThemes, currentTheme}: PromptsProps) => {
  // this for font sizes is fine just move to App file and export there
  const isPC = Platform.OS === "web" || "windows" || "macos";
  const [loading, setLoading] = useState<boolean>(false);
  const [startPrompting, setStartPrompting] = useState<boolean>(false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: loading ? "center" : undefined,
      width: "100vw",
      height: "100vh",
      flexDirection: 'column',
      textAlign: 'center',
      marginTop: loading ? -140 : 40,
    },
    prompts: {
      fontSize: getFontSize(40),
      fontFamily: "Fira Sans",
      color: currentTheme.fontColor,
      justifyContent: "center",
      margin: 12,
      minWidth: "90%",
      // flex: 1,
      height: "16vh",
    },
    promptsContainer: {
      justifyContent: "space-around",
      alignItems: "center",
      borderRadius: 8,
      width: "80%",
      minHeight: isPC ? "50%" : "40%",
      margin: 8,
      display: !startPrompting ? "none" : "flex",
      backgroundColor: currentTheme.secondaryTab,
      backdropFilter: "saturate(200%) blur(25px)",
    },
    inputBars: {
      borderRadius: 8,
      minWidth: "90%",
      padding: "8px",
      border: `5px, solid, ${currentTheme.secondaryTab}`,
      margin: 8,
      boxSizing: "border-box",
      backgroundColor: currentTheme.secondaryTab,  
      backdropFilter: "saturate(100%) blur(15px)",
      color: currentTheme.fontColor,
      marginBottom: 20,
    },
    button: {
      borderRadius: 12,
      padding: 12,
      margin: 12,
      boxSizing: "border-box",
      backgroundColor: currentTheme.secondaryTab,  
      backdropFilter: "saturate(100%) blur(15px)",
      alignItems: "center",
      display: !startPrompting ? "none" : "flex",
    },
  });

  const viewOpacity = useRef(new Animated.Value(0));
  const viewYPosition = useRef(new Animated.Value(1000)).current;
  const [clicked, setClicked] = useState<boolean>(false);
  const [index, setIndex]  = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const resetUserInput = ():void => setUserInput("");
  // prompts are the initial questions to get the process going.
  const prompts:string[] = [
    "What specific genre(s) are you looking for?",
    "What mood are you feeling right now?",
    "What instrument or combination of instruments in the music you enjoy if any?",
    "What pace or tempo do you prefer in the music you enjoy? (e.g., fast, moderate, slow)",
    "Are you more inclined towards mainstream or indie/alternative music?",
  ];
  // extraPrompts are going to be randomized and are only here to add more spark to the inisial batch
  // nested prompts will start with a yes/no question and then ask the 2nd question if the user responds yes
  const extraPromts:(string | string[])[] = [
    "What artists do you want to hear from?",
    "What artists do you NOT want to hear from?",
    ["Is there an artist you'd like to get recommendations from?", "What artist?"],
    "Do you prefer vocals or instrumental music?",
    "Do you have a preference for a specific time period of music, such as classic, contemporary, or a specific decade?",
    "Are there any specific themes or topics in lyrics that you tend to enjoy or dislike?",
    "Do you enjoy songs that are complex or straightforward?",
    "How do you feel about songs that incorporate electronic elements or synth sounds into the music?",
    "Do you prefer songs that are nostalgic?",
    "Are you open to exploring songs from different cultures or languages?",
  ]
  const addAnswer = (input:string):void => {
    setAnswers((answers) => [...answers, input]);
  }

  const delay = (time: number):Promise<null> => {
    return new Promise(() => setTimeout(() => { return null}, time));
  }
  const handleChange = (text: string):void => {
    setUserInput(text);
  };

  useEffect(() => {
    if(clicked){
      viewOpacity.current = new Animated.Value(0);
      Animated.timing(viewYPosition, {duration: 0, toValue: 800, useNativeDriver: true}).start();
      setClicked(false);
    }
    console.log(answers);
    Animated.timing(viewOpacity.current, {duration: 1000, toValue: 1, useNativeDriver: true}).start();
    Animated.timing(viewYPosition, {duration: 800, toValue: 0, useNativeDriver: true}).start();
  }, [clicked]);

  useEffect(() => {
    if(index !== 0 && index % 5 === 0){
      setLoading(true);
    }
  }, [index])

  return (
    <View style={styles.container}>
      <Text 
        style={{display: startPrompting ? "none" : "flex", color: currentTheme.fontColor}}
        onPress={() => {setStartPrompting(true); setLoading(true);}}>
          START
      </Text>
      {loading ? <ActivityIndicator size="large" color={currentTheme.fontColor} /> 
       :<View style={styles.promptsContainer}>
          <Animated.View style={[{opacity: viewOpacity.current, top: viewYPosition}]}>
            <Text style={styles.prompts}>{prompts[index]}</Text>
          </Animated.View>
          <TextInput
              style={{...styles.inputBars,}}
              placeholder="Enter your response here..."
              value={userInput}
              defaultValue={answers[index] || userInput}
              onChangeText={handleChange}
              onSubmitEditing={async ():Promise<void> => {
              addAnswer(userInput); 
              resetUserInput();
              setClicked(true);
              console.log(answers)
              setIndex(index + 1);}}
            />
        </View>
      }
      {!loading && <Pressable
        style={({pressed}) => [{
          ...styles.button, backgroundColor: pressed ? currentTheme.secondaryTab 
            : currentTheme.secondary,
        }]}>
        <Text
          style={{color: currentTheme.fontColor, }}
          onPress={async(): Promise<void> => {
            addAnswer(userInput); 
            resetUserInput();
            setClicked(true);
            setIndex(index + 1);
        }}>
          NEXT
        </Text>
      </Pressable>}
      <StatusBar style="auto" />
    </View>
  );
}