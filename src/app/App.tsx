import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import "./style/global.css";
import type { Engine, IOptions, RecursivePartial } from "tsparticles-engine";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-particles";

const particlesOptions: RecursivePartial<IOptions> = {
  autoPlay: true,
  fpsLimit: 60,
  particles: {
    color: {
      value: "#fff9f9",
    },
    number: {
      value: 50,
      density: {
        enable: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: 3,
    },
    move: {
      direction: "bottom",
      out_mode: "out",
      speed: 0.5,
      enable: true,
    },
    line_linked: {
      enable: false,
    },
  },
};

export default function App() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Particles init={particlesInit} options={particlesOptions} />
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}
