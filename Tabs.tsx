import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, PixelRatio } from "react-native";
import { Theme } from "./App";
import { Dimensions, } from 'react-native';
import { Icon } from 'react-native-elements';

// The tab system should be like so : {number: component}
// Tab Componnent just keeps track of the active tab and displays it
// (just the tab bar not the component, App still displays them)
// Create onClick function to change tab that updates current component and props
// Animate tabs being updated!
// Make sure tabs are at bottom of screen with no margin when on mobile

interface TabsProps {
  tabs: string[],
  icons: Element[],
  activeTab: number,
  setActiveTab: React.Dispatch<React.SetStateAction<number>>,
  currentTheme: Theme
};

export const Tabs = ({tabs, icons, activeTab=0, setActiveTab, currentTheme}: TabsProps) => {
  const [tabsData, setTabsData] = useState<Number>(0);
  const { width } = Dimensions.get('window');
  const fontScale = PixelRatio.getFontScale();
  console.log(currentTheme);
  const isPC = Platform.OS === "web" || "windows" || "macos";
  // need to update styling so flex box just makes them all together in even sizes. Like Blackhole
  const styles = StyleSheet.create({
    container: {
      display: "flex", 
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    // tabLeft: {
    //   flex: 1,
    //   // marginTop: 8,
    //   marginRight: 20,
    //   width: "100%",
    //   aspectRatio: isPC ? 10/3 : 9/3,
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   cursor: "pointer",
    //   fontSize: (width / 20),
    //   fontFamily: "Fira Sans",
    //   color: currentTheme.fontColor
    // },
    tab: {
      flex: 1,
      margin: 8,
      flexGrow: 100,
      // width: "100%",
      aspectRatio: isPC ? 10/3 : 9/3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: (20 / fontScale),
      fontFamily: "Fira Sans",
      color: currentTheme.fontColor,
      // width: "inherit",
      // padding: "flexible",
    },
  });

  useEffect(() => {
    const data = [];
  }, []);
  // map over all tabs and if it is active update the styling
  // (add animations!!!)
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
      <Text onPress={() => 
        setActiveTab(index)} key={index} numberOfLines={1} adjustsFontSizeToFit style={StyleSheet.flatten(
          [styles.tab, tab === tabs[activeTab] && {fontWeight: "900", fontSize: (36 / fontScale), width: "100%",}]
      )}>
      {tab}
    </Text>))}
    </View>
  )
};
