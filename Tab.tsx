import React, { useEffect, useState, FC, JSX } from "react";
import { View } from "react-native";

// The tab system should be like so : {number: component}
// Tab Componnent just keeps track of the active tab and displays it 
// (just the tab bar not the component, App still displays them)
// 

interface TabProps {
    tabs: JSX[],
    active: number
  };

export const Tab = ({tabs, active=0}: TabProps) => {
    const [activeTav, setActiveTab] = useState<Number>(0);
    const [tabsData, setTabsData] = useState<Number>(0);

    useEffect(() => {
        const data = [];
    })
    return (
      <View>
        {tabs[active]}
      </View>
    )
};
