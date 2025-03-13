import { TestTask } from "../../types";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./TaskColumn.module.css";

interface TaskColumnProps {
  columnColor: string;
  columnName: string;
  tasks: TestTask[];
}

const TaskColumn = ({ columnColor, columnName, tasks }: TaskColumnProps) => {
  return (
    <div className={styles.main}>
      <h2 style={{ backgroundColor: columnColor }} className={styles.columnTitle}>
        {columnName}
      </h2>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard key={task.id} id={task.id} borderColor={columnColor} departmentColor={"plum"} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
