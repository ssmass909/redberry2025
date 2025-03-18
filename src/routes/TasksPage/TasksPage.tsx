import { createContext, useEffect } from "react";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import styles from "./TasksPage.module.css";
import { observer } from "mobx-react";
import TaskFilters from "../../components/TaskFilters/TaskFilters";
import TasksPageStore from "../../stores/TasksPageStore";
import { useDataStore } from "../../App";
import ChipGroup from "../../components/ChipGroup/ChipGroup";

const tasksPageStore = new TasksPageStore();
export const TasksPageStoreContext = createContext(tasksPageStore);

const TasksPage = () => {
  const dataStore = useDataStore();

  useEffect(() => {
    tasksPageStore.setDataStore(dataStore);
    dataStore.fetchEverything().then(() => tasksPageStore.updateFilterOptions());
  }, []);

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.pageTitle}>დავალებების გვერდი</h1>
        <TaskFilters />
        <ChipGroup filters={["DEPARTMENT", "EMPLOYEE", "PRIORITY"]} />
        <div className={styles.tasksContainer}>
          {dataStore.taskStatuses.map((status) => (
            <TaskColumn
              key={status.name}
              columnColor={"red"}
              columnName={status.name}
              tasks={tasksPageStore.filteredTasks?.filter((task) => task.status.id === status.id) || []}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default observer(TasksPage);
