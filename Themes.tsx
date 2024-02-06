import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableHighlight, Platform } from 'react-native';
import { Theme, ThemesList } from "./App";
import { Popup } from './Popup';
import { LinearGradient } from "expo-linear-gradient";
import { getFontSize } from './tools/FontSizes';

export interface ThemesProps {
  currentTheme: Theme,
  allThemes: ThemesList,
  toggleThemes: (theme: string) => void
};

export const Themes = ({currentTheme, allThemes, toggleThemes}: ThemesProps) => {
  const isPC:string|boolean = Platform.OS === "web" || "windows" || "macos";
  const roundedBorder = Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2;
  return (
    <>
      <ScrollView contentContainerStyle={{
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
          <View style={{ borderWidth: currentTheme.name === theme ? 1 : 0, borderRadius: roundedBorder, borderColor: currentTheme.fontColor, margin: 4}}>
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
                colors={[allThemes[theme].primary, allThemes[theme].secondary, allThemes[theme].background, allThemes[theme].fontColor]}
                style={{
                  borderRadius: roundedBorder,
                  minWidth: isPC ? Dimensions.get('window').width * 0.25 : Dimensions.get('window').width * 0.4,
                  minHeight: isPC ? Dimensions.get('window').width * 0.25 : Dimensions.get('window').width * 0.4,
                  transform: [{ rotate: '45deg'}],
                  justifyContent: "center",
                  alignItems: "center",
              }}>
                <Text style={{transform: [{ rotate: '315deg'}], color: allThemes[theme].fontColor, fontWeight: "bold", fontSize: getFontSize(20)}}>{theme.toUpperCase()}</Text>
              </LinearGradient>
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>
    </>
  );
}