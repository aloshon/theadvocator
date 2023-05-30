import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useCallback, createContext } from "react";
import { Prompts } from "./Prompts";
import { Browse } from "./Browse";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Particles from 'react-particles';
import {particles} from './config/configParticles';
import { loadFull } from "tsparticles";
import type { Container, Engine, Canvas } from "tsparticles-engine";

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
  console.log(currentTheme);

  // Remove bottom tabs and find an alternative that doesn't take over the background
  // Use the particle background it is litttt

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
      await console.log(container);
  }, []);

  // const togglePages = useCallback((toggle=false) => setPromptPage(toggle), []);
  return (
    <ThemeContext.Provider value={currentTheme}>
      {/* <Prompts setSongs={setSongs} toggleThemes={toggle} themes={themes} currentTheme={currentTheme} /> */}
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
          headerTransparent: true,
        }}>  
          <Tab.Screen options={{
            tabBarLabelPosition: "below-icon",
            tabBarIcon: ({ color=currentTheme.primary, size=5 }) => (
            <MaterialCommunityIcons name="search-web" color={color} size={size} />
          )}} name='Find Songs' children={() => <View style={{ position: "relative", overflow: "hidden" }}>
          <View style={{ position: "absolute" }}>
            <Particles 
              id="tsparticles"
              style={{ position: "absolute" }}
              height="100vh" 
              width="100vw" 
              init={particlesInit}
              loaded={particlesLoaded}
              options={particles} 
            />
          </View>
          <Prompts setSongs={setSongs} toggleThemes={toggle} themes={themes} currentTheme={currentTheme} />
        </View>} />
          <Tab.Screen options={{
            tabBarLabelPosition: "below-icon",
            tabBarIcon: ({ color=currentTheme.primary, size=5 }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          )}} name="Browse" children={() => <Browse songs={songs} currentTheme={currentTheme} />} />
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
