import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from "react";
import Prompts from "./Prompts.js";
import Browse from "./Browse.js";

export default function App() {
  const [promptPage, setPromptPage] = useState(true);
  const [songs, setSongs] = useState([]);
  return (
    promptPage ? <Prompts setSongs={setSongs} /> : <Browse songs={songs} />
  );
}

const styles = StyleSheet.create({
  
});
