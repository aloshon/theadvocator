import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
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
  console.log(currentTheme);
  const isPC = Platform.OS === "web" || "windows" || "macos";
  // need to update styling so flex box just makes them all together in even sizes. Like Blackhole
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    tabLeft: {
      flex: 1,
      // marginTop: 8,
      marginRight: 20,
      // backdropFilter: "saturate(200%) blur(25px)",
      backgroundColor: "rgba(200, 200, 200, .45)",  
      backgroundImage: `linear-gradient(to right, ${currentTheme.primaryTab}, ${currentTheme.secondaryTab})`,
      width: "100%",
      aspectRatio: isPC ? 10/3 : 9/3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: (width / 20),
      fontFamily: "Fira Sans",
      color: currentTheme.fontColor
    },
    tabRight: {
      flex: 1,
      // marginTop: 8,
      marginLeft: 20,
      // backdropFilter: "saturate(200%) blur(25px)",
      backgroundColor: "rgba(200, 200, 200, .45)",
      backgroundImage: `linear-gradient(to left, ${currentTheme.primaryTab}, ${currentTheme.secondaryTab})`,
      width: "100%",
      aspectRatio: isPC ? 10/3 : 9/3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: (width / 20),
      fontFamily: "Fira Sans",
      color: currentTheme.fontColor
    },
  });

  useEffect(() => {
    const data = [];
  }, []);
  // map over all tabs and if it is active update the styling
  // (add animations!!!)
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (<Text key={index} numberOfLines={1} adjustsFontSizeToFit style={index === 0 ? StyleSheet.flatten([tab === tabs[activeTab] && {fontWeight: "900"}]) : StyleSheet.flatten([styles.tabRight, {fontWeight: "900"}])}>{icons[index]&& tab === tabs[activeTab] && tab}</Text>))}
    </View>
  )
};
