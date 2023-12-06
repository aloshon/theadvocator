import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Easing, TouchableHighlight } from 'react-native';
import { useState } from "react";
import { Song } from "./CurrentComponent";
import { Theme, ThemesList } from "./App";
import { Popup } from './Popup';
import { LinearGradient } from "expo-linear-gradient";

export interface ThemesProps {
  currentTheme: Theme,
  allThemes: ThemesList,
  toggleThemes: (theme: string) => void
};

export const Themes = ({currentTheme, allThemes, toggleThemes}: ThemesProps) => {
// set the colors by puttin ghr object properties instead on hard coding it
  return (
    <>
      {Object.keys(allThemes).map(theme => {
       <View style={{
          width: 300,
          height: 300, 
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <LinearGradient 
            colors={["#176B87", "#64CCC5", "#DAFFFB", "#071F33"]}
            style={{
              width: 300,
              height: 300, 
              borderRadius: 5
          }}><Text>Hello</Text>
          </LinearGradient>
        </View>
      })}
    </>
  );
}