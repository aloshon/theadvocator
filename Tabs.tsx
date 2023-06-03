import React, { useEffect, useState, FC, JSX } from "react";
import { View } from "react-native";

// The tab system should be like so : {number: component}
// Tab Componnent just keeps track of the active tab and displays it 
// (just the tab bar not the component, App still displays them)
// 

interface TabsProps {
    tabs: string[],
    activeTab: number,
    setActiveTab: React.Dispatch<React.SetStateAction<number>>
  };

export const Tabs = ({tabs, activeTab=0, setActiveTab}: TabsProps) => {
    const [tabsData, setTabsData] = useState<Number>(0);

    useEffect(() => {
      const data = [];
    })
    // map over all tabs and if it is active update the styling
    // (add animations!!!)
    return (
      <View>
        {tabs[activeTab]}
      </View>
    )
};
