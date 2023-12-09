import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
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
      <View style={{
        width: "100vw",
        height: "100vh",
        marginTop: 16,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'center',
        flexWrap: "wrap",
        flexDirection: "row",
        flex: 1,
      }}>
        {Object.keys(allThemes).map(theme => (
          <TouchableHighlight
            style = {{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 16,
            }}
            underlayColor={currentTheme.background}
            onPress = { () => toggleThemes(theme) }
          >
            <LinearGradient 
              colors={[allThemes[theme].primary, allThemes[theme].secondary, allThemes[theme].background]}
              style={{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                width: Dimensions.get('window').width * 0.3,
                height: Dimensions.get('window').width * 0.3,
                transform: [{ rotate: '45deg'}],
                justifyContent: "center",
                alignItems: "center",
            }}>
              <Text style={{transform: [{ rotate: '315deg'}], color: allThemes[theme].fontColor, fontWeight: "bold"}}>{theme.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableHighlight>
        ))}
      </View>
    </>
  );
}