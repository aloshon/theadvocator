import { useState, useEffect, ReactNode, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Platform, ScrollView, NativeScrollPoint, NativeScrollEvent } from 'react-native';
import { Prompts, PromptsProps } from "./Prompts";
import { Browse, BrowseProps } from "./Browse";
import { Tabs } from "./Tabs";
import { Theme, ThemesList } from "./App";
import { Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Themes } from "./Themes";
import EncryptedStorage from "react-native-encrypted-storage";

export interface CurrentComponentProps {
  allThemes: ThemesList,
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
export const CurrentComponent = ({allThemes, currentTheme, toggleThemes}: CurrentComponentProps) => {
	// const [songs, setSongs] = useState<Song[]>([{
  //   title: "test song1",
  //   artists: ["artist1", "artist2"],
  //   background: "background",
  //   duration: 100,
  //   rank: 20,
  //   preview: "none"
  // },
  // {
  //   title: "test song2",
  //   artists: ["artist3", "artist2"],
  //   background: "background2",
  //   duration: 300,
  //   rank: 230, 
  //   preview: "none"
  // },
  // {
  //   title: "test song3",
  //   artists: ["artist3", "artist4"],
  //   background: "background",
  //   duration: 140,
  //   rank: 30,
  //   preview: "none"
  // },
  // {
  //   title: "test song4",
  //   artists: ["artist1", "artist4"],
  //   background: "background",
  //   duration: 200,
  //   rank: 10,
  //   preview: "none"
  // }]);

  const [songs, setSongs] = useState<Song[]>([]);
  const isPC = Platform.OS === "web" || "windows" || "macos";

  useEffect(() => {
    const getSavedSongs = async () => {
      const songsPromise:string|null = isPC ? window.localStorage.getItem("songs") : (await EncryptedStorage.getItem("songs"));
      const savedSongs:Song[] = songsPromise!== null && JSON.parse(songsPromise);
      setSongs(savedSongs);
    };

    getSavedSongs();
  }, []);

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

  const {height, width} = Platform.OS === 'web' ? Dimensions.get('window') : Dimensions.get('screen');
  const scrollViewRef = useRef<any>();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [scrollable, setScrollable] = useState<boolean>(true);
  const [disableFollowTabs, setDisableFollowTabs] = useState<boolean>(false);
  const tabNames:string[] = ["Discover", "Browse", "Theme"];

  const followTabsWithScroll = ({layoutMeasurement, contentOffset, contentSize}:NativeScrollEvent) => {
    if(disableFollowTabs) return;

    const currentTabIndex = Math.round(contentOffset.x/width);
    setCurrentTab(currentTabIndex);
  };
  const stopOnTabIntervals = (contentOffset:NativeScrollPoint, index:number):void => {
    console.log("INT THE FUNCTION")
    if(contentOffset.x === width/index){
      setScrollable(false);
      setTimeout(() => {
        setScrollable(true)
     }, 10)
    }
  }
  const setTabsToEnd = (index:number):void => {
    // disable tab follow so it looks proper
    setCurrentTab(index);
    setDisableFollowTabs(true);  

    if (index === tabNames.length-1) scrollViewRef.current?.scrollTo({ x: 999999 })
    else if (index === 0) scrollViewRef.current?.scrollTo({ x: 0 })
    else scrollViewRef.current?.scrollTo({ x: width/index })
  }

  useEffect(() => {
    setTimeout(() => {
       setDisableFollowTabs(false)
    }, 900)

  }, [disableFollowTabs]);

	while(setSongs === undefined){
    return null;
  }

	return (
    <>
      <Tabs tabs={tabNames} icons={icons} activeTab={currentTab} setActiveTab={setCurrentTab} currentTheme={currentTheme} setTabsToEnd={setTabsToEnd} />
      <ScrollView
        ref={scrollViewRef}
        snapToOffsets={[0, width/2, 999999]}
        scrollEnabled={scrollable}
        decelerationRate="fast"
        snapToEnd={false}
        snapToStart={false}
        disableIntervalMomentum={true}
        onScroll={({nativeEvent}) => {
          followTabsWithScroll(nativeEvent);
          stopOnTabIntervals(nativeEvent.contentOffset, currentTab);
        }}
        scrollEventThrottle={10}
        alwaysBounceVertical={true}
        directionalLockEnabled={true}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        style={{ 
          width: "100vw",
          height: "100vh",
      }}>
        <View style={{width: "100vw", height: height}}>
          <Prompts setSongs={setSongs} toggleThemes={toggleThemes} currentTheme={currentTheme} />
        </View>
        <View style={{width: "100vw", height: height}}>
          <Browse songs={songs} currentTheme={currentTheme} />
        </View>
        <View style={{width: "100vw", height: height}}>
          <Themes currentTheme={currentTheme} allThemes={allThemes} toggleThemes={toggleThemes} />
        </View>
      </ScrollView>
    </>
  ) 
};