import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Theme } from "./App";
import { Dimensions, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// The tab system should be like so : {number: component}
// Tab Componnent just keeps track of the active tab and displays it 
// (just the tab bar not the component, App still displays them)
// Create onClick function to change tab that updates current component and props
// Animate tabs being updated!
// Make sure tabs are at bottom of screen with no margin when on mobile

interface TabsProps {
  tabs: string[],
  activeTab: number,
  setActiveTab: React.Dispatch<React.SetStateAction<number>>,
  currentTheme: Theme
};

export const Tabs = ({tabs, activeTab=0, setActiveTab, currentTheme}: TabsProps) => {
  const [tabsData, setTabsData] = useState<Number>(0);
  const { width } = Dimensions.get('window');
  console.log(currentTheme);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    tabLeft: {
      // marginTop: 8,
      marginRight: 20,
      backdropFilter: "saturate(200%) blur(25px)",
      backgroundColor: "rgba(200, 200, 200, .45)",  
      backgroundImage: `linear-gradient(to right, ${currentTheme.primaryTab}, ${currentTheme.secondaryTab})`,
      width: "100%",
      height: (width / 14),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: (width / 20),
      fontFamily: "Fira Sans",
      color: currentTheme.fontColor
    },
    tabRight: {
      // marginTop: 8,
      marginLeft: 20,
      backdropFilter: "saturate(200%) blur(25px)",
      backgroundColor: "rgba(200, 200, 200, .45)",  
      backgroundImage: `linear-gradient(to left, ${currentTheme.primaryTab}, ${currentTheme.secondaryTab})`,
      width: "100%",
      height: (width / 14),
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
      {tabs.map((tab, index) => (tab === tabs[activeTab] ? <Text key={index} style={index === 0 ? styles.tabLeft : styles.tabRight}><b>{tab}</b></Text> 
        : <Text key={index} style={index === 0 ? styles.tabLeft : styles.tabRight} onPress={() => setActiveTab(index)}>{tab}</Text>))}
    </View>
  )
};
