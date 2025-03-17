import { createContext, useEffect } from "react";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import styles from "./TasksPage.module.css";
import { observer } from "mobx-react";
import TaskFilters from "../../components/TaskFilters/TaskFilters";
import { toJS } from "mobx";
import TasksPageStore from "../../stores/TasksPageStore";
import { useDataStore } from "../../App";

const tasksPageStore = new TasksPageStore();
export const TasksPageStoreContext = createContext(tasksPageStore);

const TasksPage = () => {
  const dataStore = useDataStore();

  useEffect(() => {
    tasksPageStore.setDataStore(dataStore);
    dataStore.fetchEverything().then(() => tasksPageStore.updateFilterOptions());
  }, []);

  console.log("FILTERED TASKS:", toJS(tasksPageStore.filteredTasks));
  console.log("DEPARTMENT FILTER:", toJS(tasksPageStore.departmentFilter));
  console.log("EMPLOYEE FILTER:", toJS(tasksPageStore.employeeFilter));
  console.log("PRIORITY FILTER:", toJS(tasksPageStore.priorityFilter));

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.pageTitle}>დავალებების გვერდი</h1>
        <TaskFilters />
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
