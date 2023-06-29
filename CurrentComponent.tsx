import { useState, useEffect, FC } from "react";
import { Prompts, PromptsProps } from "./Prompts";
import { Browse, BrowseProps } from "./Browse";
import { Tabs } from "./Tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ActiveComponent = Element;
type TabComponents = {
  [key: number]: ActiveComponent
};

export type Themes = {
  [key: string]: Theme,
};
export type Theme = {
  primary: string,
  primaryTab: string,
  secondary: string,
  secondaryTab: string,
  background: string,
  fontColor: string,
};
export interface Song {
  title?: string,
  artists?: string[],
  background?: string,
  duration?: number,
  rank?: number,
  preview?: string,
  children?: React.ReactNode
};
const themes: Themes = {
  light: {
    primary: 'rgb(0, 120, 120)',
    primaryTab: 'rgba(0, 120, 120, 0.9)',
    secondary: 'rgb(0, 180, 200)',
    secondaryTab: 'rgba(0, 180, 200, 0.01)',
    background: 'rgb(240, 240, 240)',
    fontColor: '#333333',
  },
  dark: {
    primary: 'rgb(200, 200, 200)',
    primaryTab: 'rgba(200, 200, 200, 0.1)',
    secondary: 'rgb(100, 100, 100)',
    secondaryTab: 'rgba(100, 100, 100, 0.4)',
    background: 'rgb(40, 40, 40)',
    fontColor: '#CCCCCC',
  },
  cool: {
    primary: 'rgb(30, 147, 242)',
    primaryTab: 'rgba(30, 147, 242, 0.4)',
    secondary: 'rgb(30, 242, 147)',
    secondaryTab: 'rgba(30, 242, 147, 0.4)',
    background: 'rgb(160, 228, 228)',
    fontColor: '#CCCCCC',
  },
  snug: {
    primary: 'rgb(242, 147, 30)',
    primaryTab: 'rgba(242, 147, 30, 0.4)',
    secondary: 'rgb(147, 242, 30)',
    secondaryTab: 'rgba(147, 242, 30, 0.4)',
    background: 'rgb(228, 228, 160)',
    fontColor: '#333333',
  },
}
export const CurrentComponent = () => {
	const [songs, setSongs] = useState<Song[]>([{
    title: "test song1",
    artists: ["artist1", "artist2"],
    background: "background",
    duration: 100,
    rank: 20,
    preview: "none"
  },
  {
    title: "test song2",
    artists: ["artist3", "artist2"],
    background: "background2",
    duration: 300,
    rank: 230,
    preview: "none"
  },
  {
    title: "test song3",
    artists: ["artist3", "artist4"],
    background: "background",
    duration: 140,
    rank: 30,
    preview: "none"
  },
  {
    title: "test song4",
    artists: ["artist1", "artist4"],
    background: "background",
    duration: 200,
    rank: 10,
    preview: "none"
  }]);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes["light"]);
  const toggleThemes = (theme:string) => {
    setCurrentTheme(themes[theme]);
  };
  const tabComponents: TabComponents = {
    0: <Prompts setSongs={setSongs} toggleThemes={toggleThemes} themes={themes} currentTheme={currentTheme} />,
    1: <Browse songs={songs} currentTheme={currentTheme} />,
  };

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [CurrentComponent, setCurrentComponent] = useState<ActiveComponent>(tabComponents[currentTab]);
	const updateCurrentComponent = (component: ActiveComponent): void => setCurrentComponent(component);

	useEffect(() => {
    const newComponent = tabComponents[currentTab];
    updateCurrentComponent(newComponent);
  }, [currentTab]);

  const tabNames:string[] = ["Find Songs", "Browse Songs"];

  console.log(CurrentComponent);

	while(setSongs === undefined){
    return null;
  }

	return (
    <>
      <Tabs tabs={tabNames} activeTab={currentTab} setActiveTab={setCurrentTab} currentTheme={currentTheme} />
      {CurrentComponent}
    </>
  )
};