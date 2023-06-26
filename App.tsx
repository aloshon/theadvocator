import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useCallback, createContext, FC, useEffect, Component } from "react";
import { Prompts, PromptsProps } from "./Prompts";
import { Browse, BrowseProps } from "./Browse";
import { Tabs } from "./Tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Particles from 'react-particles';
import {particles} from './config/configParticles';
import { loadFull } from "tsparticles";
import type { Container, Engine, Canvas } from "tsparticles-engine";

export interface Song {
  title?: string,
  artists?: string[],
  background?: string,
  duration?: number,
  rank?: number,
  preview?: string,
  children?: React.ReactNode
};

export type Themes = {
  [key: string]: Theme,
};

export type Theme = {
  primary: string,
  secondary: string,
  background: string,
};

type ActiveComponent = Element;

export type TabComponents = {
  [key: number]: ActiveComponent
};



export default function App() {
  const [promptPage, setPromptPage] = useState(true); 
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
  const [currentTab, setCurrentTab] = useState<number>(0);

  const toggleThemes = (theme:string) => {
    setCurrentTheme(themes[theme]);
  };

  const ThemeContext = createContext(currentTheme);

  const tabComponents: TabComponents = {
    0: <Prompts setSongs={setSongs} toggleThemes={toggleThemes} themes={themes} currentTheme={currentTheme} />,
    1: <Browse songs={songs} currentTheme={currentTheme} />,
  }
  // Create onClick function to change tab that updates current component and props
  // Animate tabs being updated!
  const tabNames:string[] = ["Find Songs", "Browse Songs"];
  const [CurrentComponent, setCurrentComponent] = useState<ActiveComponent>(tabComponents[currentTab]);
  console.log(tabNames);
  console.log(CurrentComponent);
 
  const updateCurrentComponent = (component: ActiveComponent): void => setCurrentComponent(component);

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
      await console.log(container);
  }, []);

  useEffect(() => {
    const newComponent = tabComponents[currentTab];
    updateCurrentComponent(newComponent);
  }, [currentTab]);

  while(setSongs === undefined){
    return null;
  }
// Put current component in its own component so Particles doesnt reload

  return (
    <ThemeContext.Provider value={currentTheme}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Particles
            id="tsparticles"
            style={{ position: "absolute" }}
            height="100vh"
            width="100vw"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particles}
          />
        </View>
        <Tabs tabs={tabNames} activeTab={currentTab} setActiveTab={setCurrentTab} currentTheme={currentTheme} />
        <>{CurrentComponent} </>
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative", 
    overflow: "hidden"
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

const themes: Themes = {
  light: {
    primary: 'rgb(120, 120, 120)',
    secondary: 'rgb(180, 180, 200)',
    background: 'rgb(240, 240, 240)',
  },
  dark: {
    primary: 'rgb(200, 200, 200)',
    secondary: 'rgb(100, 100, 100)',
    background: 'rgb(40, 40, 40)',
  },
  cool: {
    primary: 'rgb(30, 147, 242)',
    secondary: 'rgb(30, 242, 147)',
    background: 'rgb(160, 228, 228)',
  },
  snug: {
    primary: 'rgb(242, 147, 30)',
    secondary: 'rgb(147, 242, 30)',
    background: 'rgb(228, 228, 160)',
  },
}
