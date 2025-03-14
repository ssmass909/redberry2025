import { createContext, useEffect } from "react";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import styles from "./TasksPage.module.css";
import { observer } from "mobx-react";
import TasksPageStore from "../../stores/TasksPageStore";
import TaskFilters from "../../components/TaskFilters/TaskFilters";
import { toJS } from "mobx";

const tasksPageStore = new TasksPageStore();
export const TasksPageStoreContext = createContext(tasksPageStore);

const TasksPage = () => {
  useEffect(() => {
    tasksPageStore.fetchTasks();
    tasksPageStore.fetchPriorities();
    tasksPageStore.fetchDepartments();
    tasksPageStore.fetchEmployees();
    tasksPageStore.fetchStatuses();
  }, []);

  console.log("FILTERED TASKS:", toJS(tasksPageStore.filteredTasks));

  return (
    <TasksPageStoreContext.Provider value={tasksPageStore}>
      <div className={styles.main}>
        <h1 className={styles.pageTitle}>დავალებების გვერდი</h1>
        <TaskFilters />
        <div className={styles.tasksContainer}>
          {tasksPageStore.taskStatuses.map((status) => (
            <TaskColumn
              key={status.name}
              columnColor={"red"}
              columnName={status.name}
              tasks={tasksPageStore.filteredTasks.filter((task) => task.status.id === status.id)}
            />
          ))}
        </div>
      </div>
    </TasksPageStoreContext.Provider>
  );
};

export default observer(TasksPage);
