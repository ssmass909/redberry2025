import { useContext, useEffect } from "react";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import styles from "./TasksPage.module.css";
import { observer } from "mobx-react";
import TaskFilters from "../../components/TaskFilters/TaskFilters";
import { toJS } from "mobx";
import CreateEmployeeModal from "../../components/CreateEmployeeModal/CreateEmployeeModal";
import { TasksPageStoreContext } from "../../App";

const TasksPage = () => {
  const tasksPageStore = useContext(TasksPageStoreContext);
  useEffect(() => {
    tasksPageStore.fetchTasks();
    tasksPageStore.fetchPriorities();
    tasksPageStore.fetchDepartments();
    tasksPageStore.fetchEmployees();
    tasksPageStore.fetchStatuses();
  }, []);

  console.log("FILTERED TASKS:", toJS(tasksPageStore.filteredTasks));

  return (
    <>
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
      <CreateEmployeeModal />
    </>
  );
};

export default observer(TasksPage);
