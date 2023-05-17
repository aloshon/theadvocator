import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useCallback, createContext } from "react";
import Prompts from "./Prompts.js";
import Browse from "./Browse.js";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  const [promptPage, setPromptPage] = useState(true);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes["light"]);
  const toggle = (theme:string) => {
      setCurrentTheme(themes[theme])
  };

  const ThemeContext = createContext(currentTheme);


  // const togglePages = useCallback((toggle=false) => setPromptPage(toggle), []);
  return (
    <ThemeContext.Provider value={currentTheme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Find Songs" children={() => <Prompts setSongs={setSongs} toggleThemes={setCurrentTheme} themes={themes} />} />
          <Tab.Screen name="Browse" component={() => <Browse songs={songs} />} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  
});

type Song = {
  title?: string,
  artists?: [string],
  background?: string,
  duration?: number,
  rank?: number,
  preview?: string
};

type Theme = {
  [key: string]: {
    primary: string,
    secondary: string,
    background: string,
  },
};

const themes: Theme = {
  light: {
    primary: 'rgb(120, 120, 120)',
    secondary: 'rgb(180, 180, 200)',
    background: 'rgb(240, 240, 240)',
  },
  dark: {
    primary: 'rgb(200, 200, 200)',
    secondary: 'rgb(100, 100, 100)',
    background: 'rgb(40, 40, 40)',
  },
  cool: {
    primary: 'rgb(30, 147, 242)',
    secondary: 'rgb(30, 242, 147)',
    background: 'rgb(160, 228, 228)',
  },
  snug: {
    primary: 'rgb(242, 147, 30)',
    secondary: 'rgb(147, 242, 30)',
    background: 'rgb(228, 228, 160)',
  },
}
