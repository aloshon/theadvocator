import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useCallback } from "react";
import Prompts from "./Prompts.js";
import Browse from "./Browse.js";

export default function App() {
  const [promptPage, setPromptPage] = useState(true);
  const [songs, setSongs] = useState([]);
  const togglePages = useCallback((toggle=false) => setPromptPage(toggle), []);
  return (
    promptPage ? <Prompts setSongs={setSongs} togglePages={togglePages} /> : <Browse songs={songs} togglePages={togglePages} />
  );
}

const styles = StyleSheet.create({
  
});
