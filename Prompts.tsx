import { StatusBar } from 'expo-status-bar';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, Animated, PixelRatio, Platform, ActivityIndicator } from 'react-native';
import { Keyframe, FadingTransition } from 'react-native-reanimated';
import { useState, useEffect, useRef } from "react";
import { Song } from "./CurrentComponent";
import { Theme } from "./App";
import { getFontSize } from './tools/FontSizes';

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
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      borderRadius: 8,
      width: "80%",
      minHeight: isPC ? "50%" : "40%",
      margin: 8,
      // padding: 4,
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
      display: "flex",
      alignItems: "center",
    },
  });

  const viewOpacity = useRef(new Animated.Value(0));
  const viewYPosition = useRef(new Animated.Value(1000)).current;
  const [clicked, setClicked] = useState<boolean>(false);
  const [index, setIndex]  = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const resetUserInput = ():void => setUserInput("");

  const prompts:string[] = [
    "Do you have any favorite genres?",
    "What mood are you feeling right now?",
    "Are you looking for songs with certain instruments?",
    "Are you looking for songs within a certain tempo?",
    "Do you want popular music?",
    "What era of music do you want to choose from?",
  ];
  const answers:string[] = [

  ];

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
              answers.push(userInput); 
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
            answers.push(userInput); 
            resetUserInput();
            setClicked(true);
            setIndex(index + 1); 
            console.log(answers);
        }}>
          NEXT
        </Text>
      </Pressable>}
      <StatusBar style="auto" />
    </View>
  );
}