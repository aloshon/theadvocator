import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useCallback, createContext } from "react";
import Prompts from "./Prompts.js";
import Browse from "./Browse.js";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [promptPage, setPromptPage] = useState(true);
  const [songs, setSongs] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(themes["light"]);
  const toggle = (theme) => {
      setCurrentTheme(themes[theme])
  };

  const ThemeContext = createContext(currentTheme)


  const togglePages = useCallback((toggle=false) => setPromptPage(toggle), []);
  return (
    <ThemeContext.Provider value={{currentTheme}}>
      <NavigationContainer> 
        <Stack.Navigator>
          <Stack.Screen
            name="Prompts"
            component={<Prompts setSongs={setSongs} toggleTheme={toggle} />}
            options={{title: 'Find Songs'}}
          />
          <Stack.Screen name="Browser" 
            component={<Browse songs={songs} />}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  
});

const themes = {
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
