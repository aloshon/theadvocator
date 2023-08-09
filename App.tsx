import { StyleSheet, View, Dimensions } from 'react-native';
import { useCallback, useState, useEffect } from "react";
import { CurrentComponent } from "./CurrentComponent";
import Particles from 'react-particles';
import {particles} from './config/configParticles';
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";

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

const themes: Themes = {
  light: {
    primary: 'rgb(180, 180, 180)',
    primaryTab: 'rgba(180, 180, 180, 0.9)',
    secondary: 'rgb(240, 240, 240)',
    secondaryTab: 'rgba(210, 210, 210, 0.1)',
    background: 'rgba(240, 240, 240)',
    fontColor: '#333333',
  },
  dark: {
    primary: 'rgb(50, 50, 50)',
    primaryTab: 'rgba(50, 50, 50, 0.9)',
    secondary: 'rgb(80, 80, 80)',
    secondaryTab: 'rgba(80, 80, 80, 0.1)',
    background: 'rgba(20, 20, 20)',
    fontColor: '#CCCCCC',
  },
  cool: {
    primary: 'rgb(23, 107, 135)',
    primaryTab: 'rgba(23, 107, 135, 0.9)',
    secondary: 'rgb(100, 204, 197)',
    secondaryTab: 'rgba(100, 204, 197, 0.1)',
    background: 'rgba(7, 31, 51)',
    fontColor: '#DAFFFB',
  },
  snug: {
    primary: 'rgb(50, 50, 50)',
    primaryTab: 'rgba(50, 50, 50, 0.9)',
    secondary: 'rgb(80, 80, 80)',
    secondaryTab: 'rgba(80, 80, 80, 0.1)',
    background: 'rgba(20, 20, 20)',
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
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes["cool"]);
  const toggleThemes = useCallback((theme:string) => {
    setCurrentTheme(themes[theme]);
  }, []);

  return (
    <View style={styles.mainContainer}>
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
      <CurrentComponent currentTheme={currentTheme} toggleThemes={toggleThemes} />
    </View>
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