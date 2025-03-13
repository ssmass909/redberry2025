import { createContext, useEffect } from "react";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import styles from "./TasksPage.module.css";
import { observer } from "mobx-react";
import { ActiveFilter } from "../../types";
import TasksPageStore from "../../stores/TasksPageStore";

const tasksPageStore = new TasksPageStore();
export const TasksPageStoreContext = createContext(tasksPageStore);

const TasksPage = () => {
  useEffect(() => {
    tasksPageStore.fetchTasks();
    tasksPageStore.fetchPriorities();
    tasksPageStore.fetchDepartments();
    tasksPageStore.fetchEmployees();
  }, []);

  const onFilterButtonClick = (filter: ActiveFilter) => {
    if (filter === tasksPageStore.activeFilter) {
      tasksPageStore.setActiveFilter(null);
      return;
    }
    tasksPageStore.setActiveFilter(filter);
  };

  return (
    <TasksPageStoreContext.Provider value={tasksPageStore}>
      <div className={styles.main}>
        <h1 className={styles.pageTitle}>დავალებების გვერდი</h1>
        <div className={styles.filtersContainer}>
          <button
            onClick={() => onFilterButtonClick("DEPARTMENT")}
            className={`${styles.departmentFilter} ${styles.filter}`}
          >
            <span>დეპარტამენტი</span>
            <img src="down_arrow.svg" />
          </button>
          <button
            onClick={() => onFilterButtonClick("PRIORITY")}
            className={`${styles.priorityFilter} ${styles.filter}`}
          >
            <span>პრიორიტეტი</span>
            <img src="down_arrow.svg" />
          </button>
          <button
            onClick={() => onFilterButtonClick("EMPLOYEE")}
            className={`${styles.employeeFilter} ${styles.filter}`}
          >
            <span>თანამშრომელი</span>
            <img src="down_arrow.svg" />
          </button>
        </div>
        <div className={styles.tasksContainer}>
          <TaskColumn
            columnColor={"#F7BC30"}
            columnName={"დასაწყები"}
            tasks={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 6 }]}
          />
          <TaskColumn
            columnColor={"#FB5607"}
            columnName={"პროგრესში"}
            tasks={[{ id: 11 }, { id: 21 }, { id: 31 }, { id: 41 }]}
          />
          <TaskColumn
            columnColor={"#FF006E"}
            columnName={"მზად ტესტირებისთვის"}
            tasks={[{ id: 12 }, { id: 22 }, { id: 32 }, { id: 42 }]}
          />
          <TaskColumn
            columnColor={"#3A86FF"}
            columnName={"დასრულებული"}
            tasks={[{ id: 13 }, { id: 23 }, { id: 33 }, { id: 43 }]}
          />
        </div>
      </div>
    </TasksPageStoreContext.Provider>
  );
};

export default observer(TasksPage);
