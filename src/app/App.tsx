import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import "./style/global.css";

export default function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}
