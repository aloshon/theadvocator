import { StatusBar } from 'expo-status-bar';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, Animated, PixelRatio } from 'react-native';
import { Keyframe, FadingTransition } from 'react-native-reanimated';
import { useState, useEffect, useRef } from "react";
import { Song } from "./CurrentComponent";
import { Themes, Theme } from "./App";

export interface PromptsProps {
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>
  toggleThemes: (theme: string) => void
  currentTheme: Theme,
  children?: React.ReactNode
};

export const Prompts = ({setSongs, toggleThemes, currentTheme}: PromptsProps) => {
  // this for font sizes is fine just move to App file and export there
  const { width: screenWidth } = Dimensions.get('window');
  console.log(screenWidth);
  console.log(currentTheme.secondary);
  const [largeSize, setLargeSize] = useState<number>(screenWidth <= 500 ? 28 : screenWidth <= 800 ? 48 : 72);
  console.log(PixelRatio.get());
  useEffect(() => {
    setLargeSize(screenWidth <= 500 ? 28 : screenWidth <= 800 ? 48 : 72);
    console.log(largeSize);
  }, [Dimensions.get('window').width]); 
  
  const fontScale:number = PixelRatio.getFontScale();
  const getLargeFontSize = ():number => largeSize;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      width: "97%",
      height: "100vh",
      flexDirection: 'column',
      textAlign: 'center',
      margin: 12,
    },
    prompts: {
      fontSize: getLargeFontSize(),
      fontFamily: "Fira Sans",
      color: currentTheme.fontColor,
      margin: 12
    },
    promptsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 8,
      minWidth: "90%",
      minHeight: "50%",
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

  const viewOpacity = useRef(new Animated.Value(0));
  const viewYPosition = useRef(new Animated.Value(1000)).current;

  const [clicked, setClicked] = useState<boolean>(false);
  const [index, setIndex]  = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const resetUserInput = ():void => setUserInput("");

  const prompts:string[] = [
    "Do you have any favorite artists or genres?",
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

  return (
    <View style={styles.container}>
      <View style={styles.promptsContainer}>
        <Animated.View style={[{opacity: viewOpacity.current, top: viewYPosition}]}>
          <Text style={styles.prompts}>{prompts[index]}</Text>
          <TextInput
            style={styles.inputBars}
            placeholder="Enter your response here..."
            value={userInput}
            defaultValue={answers[index] || userInput}
            onChangeText={handleChange}
            onSubmitEditing={async ():Promise<void> => {
            answers.push(userInput); 
            resetUserInput();
            setClicked(true);
            setIndex(index + 1);}}
          />
        </Animated.View>
      </View>
      <Pressable
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
        }}>
          CONTINUE
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}