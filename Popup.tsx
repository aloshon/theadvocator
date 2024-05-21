import { Song } from "./CurrentComponent";
import { Theme } from "./App";
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { getFontSize } from './tools/FontSizes';

interface PopupProps {
  song: Song|null,
  handleClose: () => void,
  currentTheme: Theme
}

export const Popup = ({song, handleClose, currentTheme}: PopupProps) => {
	console.log(song);
	const isPC = Platform.OS === "web" || "windows" || "macos";
  const styles = StyleSheet.create({
    popupBoxBackground: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.7)",
    	width: "100vw",
      height: "100vh",
			top: 0,
			left: 0,
			flex: 1,
    },
    box: {
      position: "relative",
			display: "flex",
			width: isPC ? "50%" : "75%",
			margin: "auto",
			height: "auto",
			maxHeight: "70vh",
			marginTop: "calc(25vh - 20px)",
			backgroundColor: "#fff",
			borderRadius: 7,
			padding: "15px",
			border: "1px solid #999",
			overflow: "visible",
			alignItems: "center",
			color: "gray",
    },
		songDetails: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			bottom: 40,
		},
		closeIcon: {
			cursor: "pointer",
			display: "flex",
			// position: "absolute",
			zIndex: 7,
			backgroundColor: "#eeeeee",
			alignSelf: "flex-end",
			width: "2em",
			height: "2em",
			left: 36,
			bottom: 44,
			borderRadius: 50,
			justifyContent: "center",
			alignItems: "center",
			lineHeight: 20,
			// textAlign: "center",
			border: "1px solid grey",
			fontSize: 20,
			marginTop: 10
		},
    text: {
      fontFamily: "'Courier New', monospace",
    }
  });
  return (
    <View style={styles.popupBoxBackground}>
	    <View style={styles.box}>
				<Pressable style={styles.closeIcon} onPress={handleClose}>
					<Text>X</Text>
				</Pressable>
        <View style={styles.songDetails}>
          <Text>{song?.title}</Text>
          <Text>{song?.title}</Text>
          <Text>{song?.rank}</Text>
          <Text>{song?.duration}</Text>
					<Text>{song?.artist}</Text>
        </View>
      </View>
    </View>
  )
};