import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useCallback, useState } from "react";
import { CurrentComponent } from "./CurrentComponent";
import Particles from 'react-particles';
import {particles} from './config/configParticles'; 
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";

export type ThemesList = { 
  [key: string]: Theme,
};

export type Theme = {
  name: string,
  primary: string,
  primaryTab: string,
  secondary: string,
  secondaryTab: string,
  background: string,
  fontColor: string,
};

const themes: ThemesList = {
  light: {
    name: "light",
    primary: 'rgb(210, 211, 211)',
    primaryTab: 'rgba(210, 211, 211, 0.9)',
    secondary: 'rgb(228, 229, 241)',
    secondaryTab: 'rgba(228, 229, 241, 0.1)',
    background: 'rgb(250, 250, 250)', 
    fontColor: '#77777A',
  },
  dark: {
    name: "dark",
    primary: 'rgb(50, 50, 50)',
    primaryTab: 'rgba(50, 50, 50, 0.9)',
    secondary: 'rgb(80, 80, 80)',
    secondaryTab: 'rgba(80, 80, 80, 0.1)',
    background: 'rgb(20, 20, 20)',
    fontColor: '#CCCCCC',
  },
  cool: {
    name: "cool",
    primary: 'rgb(23, 107, 135)',
    primaryTab: 'rgba(23, 107, 135, 0.9)',
    secondary: 'rgb(100, 204, 197)',
    secondaryTab: 'rgba(100, 204, 197, 0.1)',
    background: 'rgb(7, 31, 51)',
    fontColor: '#DAFFFB',
  },
  snug: {
    name: "snug",
    primary: 'rgb(50, 50, 50)',
    primaryTab: 'rgba(50, 50, 50, 0.9)',
    secondary: 'rgb(80, 80, 80)',
    secondaryTab: 'rgba(80, 80, 80, 0.1)',
    background: 'rgb(20, 20, 20)',
    fontColor: '#CCCCCC',
  },
}

export default function App() {
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
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes["light"]);
  const toggleThemes = useCallback((theme:string) => {
    setCurrentTheme(themes[theme]);
  }, []);

  const styles = StyleSheet.create({
    container: {
      position: "relative",
      overflow: "hidden",
    },
    mainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh", 
    },
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Particles
          id="tsparticles"
          style={{ position: "absolute" }}
          height="100vh"
          width="100vw"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{...particles, background: {color: {value: currentTheme.background}}}}
        />
      </View>
      <CurrentComponent allThemes={themes} currentTheme={currentTheme} toggleThemes={toggleThemes} />
    </SafeAreaView>
  );
}
