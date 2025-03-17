import { useContext } from "react";
import styles from "./GlobalLayout.module.css";
import { Link, Outlet } from "react-router";
import { TasksPageStoreContext } from "../../App";

const GlobalLayout = () => {
  const tasksPageStore = useContext(TasksPageStoreContext);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <img className={styles.logo} src="/momentum_logo.svg" alt="Momentum logo" />
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
          onClick={() => tasksPageStore.setCreateEmployeeModalOpen(true)}
        >
          <span className={`${styles.btnText} ${styles.outlinedBtnText}`}>თანამშრომლის შექმნა</span>
        </button>
      </header>
      <Outlet />
    </div>
  );
};

export default GlobalLayout;
