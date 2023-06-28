import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Theme } from "./CurrentComponent";
import { Dimensions } from 'react-native'
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

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      margin: 12,
      width: "100%",
    },
    tab: {
      margin: 12,
      backgroundColor: "rgba(200, 200, 200, .45)",  
      backgroundImage: `linear-gradient(to right, ${currentTheme.primary}, ${currentTheme.secondary}`,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: (width / 24)
    }
  });

  useEffect(() => {
    const data = [];
  }, []);
  // map over all tabs and if it is active update the styling
  // (add animations!!!)
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (tab === tabs[activeTab] ? <Text style={styles.tab}><b>{tab}</b></Text> : <div style={styles.tab} onClick={() => setActiveTab(index)}><Text style={{fontSize: (width / 24)}}>{tab}</Text></div>))}
    </View>
  )
};
