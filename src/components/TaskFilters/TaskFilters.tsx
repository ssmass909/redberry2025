import { useContext } from "react";
import { ActiveFilter } from "../../types";
import styles from "./TaskFilters.module.css";
import FilterBody from "../FilterBody/FilterBody";
import { observer } from "mobx-react";
import { TasksPageStoreContext } from "../../App";

const TaskFilters = () => {
  const tasksPageStore = useContext(TasksPageStoreContext);

  const onFilterButtonClick = (filter: ActiveFilter) => {
    if (filter === tasksPageStore.activeFilter) {
      tasksPageStore.setActiveFilter(null);
      return;
    }
    tasksPageStore.setActiveFilter(filter);
    console.log("CLIENT: tasksPageStore.activeFilter:", tasksPageStore.activeFilter);
  };

  return (
    <>
      <div className={styles.main}>
        <button onClick={() => onFilterButtonClick("DEPARTMENT")} className={`${styles.filter}`}>
          <span>დეპარტამენტი</span>
          <img src="down_arrow.svg" />
        </button>
        <button onClick={() => onFilterButtonClick("PRIORITY")} className={`${styles.filter}`}>
          <span>პრიორიტეტი</span>
          <img src="down_arrow.svg" />
        </button>
        <button onClick={() => onFilterButtonClick("EMPLOYEE")} className={` ${styles.filter}`}>
          <span>თანამშრომელი</span>
          <img src="down_arrow.svg" />
        </button>
      </div>
      <FilterBody />
    </>
  );
};

export default observer(TaskFilters);
