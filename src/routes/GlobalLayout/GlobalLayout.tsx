import styles from "./GlobalLayout.module.css";
import { Outlet } from "react-router";

const GlobalLayout = () => {
  return (
    <div className={styles.main}>
      <Outlet />
    </div>
  );
};

export default GlobalLayout;
