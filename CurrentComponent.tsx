import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Prompts, PromptsProps } from "./Prompts";
import { Browse, BrowseProps } from "./Browse";
import { Tabs } from "./Tabs";
import { Theme, Themes } from "./App";
import { Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ActiveComponent = Element;
type TabComponents = {
  [key: number]: ActiveComponent
};
export interface CurrentComponentProps {
  currentTheme: Theme,
  toggleThemes: (theme: string) => void
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
export const CurrentComponent = ({currentTheme, toggleThemes}: CurrentComponentProps) => {
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
  const tabComponents: TabComponents = {
    0: <Prompts setSongs={setSongs} toggleThemes={toggleThemes} currentTheme={currentTheme} />,
    1: <Browse songs={songs} currentTheme={currentTheme} />,
  };

  const icons:Element[] = [
    <Icon name="search"/>,
    <Icon name="list"/>,
    <Icon name="palette"/>,
  ];

  const styles = StyleSheet.create({
    appName: {
      color: currentTheme.fontColor,
      fontSize: 20,
      width: 100,
    },
    slide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    wrapper: {},
  });

  const [currentTab, setCurrentTab] = useState<number>(1);
  const [CurrentComponent, setCurrentComponent] = useState<ActiveComponent>(tabComponents[currentTab]);
	const updateCurrentComponent = (component: ActiveComponent): void => setCurrentComponent(component);

	useEffect(() => {
    const newComponent = tabComponents[currentTab];
    updateCurrentComponent(newComponent);
  }, [currentTab]);

  const tabNames:string[] = ["Discover", "Browse", "Theme"];

  console.log(CurrentComponent);

	while(setSongs === undefined){
    return null;
  }

	return (
    <>
      <Text style={styles.appName}>The Advocator</Text>
      <Tabs tabs={tabNames} icons={icons} activeTab={currentTab} setActiveTab={setCurrentTab} currentTheme={currentTheme} />
      {CurrentComponent}
      {/* <Swiper style={styles.wrapper} showsButtons={true} horizontal={true}>
        <Prompts setSongs={setSongs} toggleThemes={toggleThemes} currentTheme={currentTheme} />
        <Browse songs={songs} currentTheme={currentTheme} />
      </Swiper> */}
    </>
  ) 
};