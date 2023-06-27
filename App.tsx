import { StyleSheet, View } from 'react-native';
import { useCallback } from "react";
import { CurrentComponent } from "./CurrentComponent";
import Particles from 'react-particles';
import {particles} from './config/configParticles';
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";


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
          options={particles}
        />
      </View>
      <CurrentComponent />
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