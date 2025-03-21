import { useCreateEmployeeModalStore } from "../../App";
import styles from "./GlobalLayout.module.css";
import { Link, Outlet } from "react-router";

const GlobalLayout = () => {
  const createEmployeeModalStore = useCreateEmployeeModalStore();

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <Link style={{ all: "unset", cursor: "pointer" }} to={"/tasks"}>
          <img className={styles.logo} src="/momentum_logo.svg" alt="Momentum logo" />
        </Link>
        <Link to={"/createTask"}>
          <button className={`${styles.btn} ${styles.filledBtn}`}>
            <div className={styles.filledBtnInnerContainer}>
              <img className={styles.plusIcon} src="/plus_icon.svg" alt="plus_icon" />
              <span className={`${styles.btnText} ${styles.filledBtnText}`}>შექმენი ახალი დავალება</span>
            </div>
          </button>
        </Link>
        <button
          className={`${styles.btn} ${styles.outlinedBtn}`}
          onClick={() => createEmployeeModalStore.setModalOpen(true)}
        >
          <span className={`${styles.btnText} ${styles.outlinedBtnText}`}>თანამშრომლის შექმნა</span>
        </button>
      </header>
      <Outlet />
    </div>
  );
};

export default GlobalLayout;
