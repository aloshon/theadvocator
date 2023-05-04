import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useCallback } from "react";
import Prompts from "./Prompts.js";
import Browse from "./Browse.js";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [promptPage, setPromptPage] = useState(true);
  const [songs, setSongs] = useState([]);
  const togglePages = useCallback((toggle=false) => setPromptPage(toggle), []);
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen
          name="Prompts"
          component={<Prompts setSongs={setSongs} togglePages={togglePages} />}
          options={{title: 'Find Songs'}}
        />
        <Stack.Screen name="Browser" 
          component={<Browse songs={songs} togglePages={togglePages} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  
});
