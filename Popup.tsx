import { Song } from "./CurrentComponent";
import { Theme } from "./App";
import { Button, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { getFontSize } from './tools/FontSizes';

interface PopupProps {
  data: Song|null,
  handleClose: () => void,
  currentTheme: Theme
}

export const Popup = ({data, handleClose, currentTheme}: PopupProps) => {
  const styles = StyleSheet.create({
    popupBox: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.7)",
    	width: "100vw",
      height: "100vh",
			top: 0,
			left: 0,
			marginTop: "10px",
    },
    box: {
      position: "relative",
			width: "70%",
			margin: "auto",
			height: "auto",
			maxHeight: "70vh",
			marginTop: "calc(100vh - 85vh - 20px)",
			backgroundColor: "#fff",
			borderRadius: 4,
			padding: "15px",
			border: "1px solid #999",
			overflow: "visible",
			color: "gray",
    },
		closeIcon: {
			cursor: "pointer",
			position: "absolute",
			right: "calc(15% - 10px)",
			top: "calc(100vh - 85vh - 25px)",
			backgroundColor: "#eeeeee",
			width: 25,
			height: 25,
			borderRadius: 0.5,
			lineHeight: 20,
			textAlign: "center",
			border: "1px solid grey",
			fontSize: 20,
			marginTop: 10
		},
    text: {
      fontFamily: "'Courier New', monospace",
    }
  });
  return (
    <View>
	    <View>
        <Button title="X" onPress={() => handleClose}/>
        <View>
          <Text>{data?.title}</Text>
          <Text>{data?.title}</Text>
          <Text>{data?.rank}</Text>
          <Text>{data?.duration}</Text>
		  <Text>{data?.artist}</Text>
        </View>
      </View>
    </View>
  )
};