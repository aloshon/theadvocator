import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, PixelRatio } from "react-native";
import { Theme } from "./App";
import { Dimensions, } from 'react-native';
import { Icon } from 'react-native-elements';
import { getFontSize } from "./tools/FontSizes";

interface TabsProps {
  tabs: string[],
  icons: Element[],
  activeTab: number,
  setActiveTab: React.Dispatch<React.SetStateAction<number>>,
  currentTheme: Theme,
  setTabsToEnd: (index: number) => void
};

export const Tabs = ({tabs, icons, activeTab=0, setActiveTab, currentTheme, setTabsToEnd}: TabsProps) => {
  const fontScale = PixelRatio.getFontScale();
  console.log(currentTheme);
  const isPC = Platform.OS === "web" || "windows" || "macos";
  // need to update styling so flex box just makes them all together in even sizes. Like Blackhole
  const styles = StyleSheet.create({
    container: {
      display: "flex", 
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "stretch",
      width: "100%",
      margin: 12,
    },
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
      width: "50%",
      // padding: "flexible",
    },
  });

  useEffect(() => {
    const data = [];
  }, []);

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
      <Text onPress={() => {
        setTabsToEnd(index)
        setActiveTab(index);
      }} key={index} numberOfLines={1} adjustsFontSizeToFit style={StyleSheet.flatten(
        [styles.tab, tab === tabs[activeTab] && {fontWeight: "900", fontSize: getFontSize(36), width: "100%",}]
      )}>
      {tab}
      </Text>))}
    </View>
  )
};
