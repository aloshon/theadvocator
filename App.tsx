import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useCallback, createContext } from "react";
import { Prompts } from "./Prompts";
import { Browse } from "./Browse";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export interface Song {
  title?: string,
  artists?: string[],
  background?: string,
  duration?: number,
  rank?: number,
  preview?: string
};

export type Themes = {
  [key: string]: Theme
};

export type Theme = {
  primary: string,
  secondary: string,
  background: string,
};

export default function App() {
  const [promptPage, setPromptPage] = useState(true);
  const [songs, setSongs] = useState<Song[]>([{
    title: "test song1",
    artists: ["artist1", "artist2"],
    background: "background",
    duration: 100,
    rank: 20,
    preview: "none"
  },
  {
    title: "test song2",
    artists: ["artist3", "artist2"],
    background: "background2",
    duration: 300,
    rank: 230,
    preview: "none"
  },
  {
    title: "test song3",
    artists: ["artist3", "artist4"],
    background: "background",
    duration: 140,
    rank: 30,
    preview: "none"
  },
  {
    title: "test song4",
    artists: ["artist1", "artist4"],
    background: "background",
    duration: 200,
    rank: 10,
    preview: "none"
  }]);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes["light"]);
  const toggle = (theme:string) => {
    setCurrentTheme(themes[theme]);
  };

  const ThemeContext = createContext(currentTheme);


  // const togglePages = useCallback((toggle=false) => setPromptPage(toggle), []);
  return (
    <ThemeContext.Provider value={currentTheme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Find Songs" component={Prompts} setSongs={setSongs} toggleThemes={toggle} themes={themes} />
          <Tab.Screen name="Browse" component={Browse} songs={songs} currentTheme={currentTheme} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    
  }
});

const themes: Themes = {
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
