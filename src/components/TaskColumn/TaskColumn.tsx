import { Task } from "../../types";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./TaskColumn.module.css";

interface TaskColumnProps {
  columnColor: string;
  columnName: string;
  tasks: Task[];
}

const TaskColumn = ({ columnColor, columnName, tasks }: TaskColumnProps) => {
  return (
    <div className={styles.main}>
      <h2 style={{ backgroundColor: columnColor }} className={styles.columnTitle}>
        {columnName}
      </h2>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} borderColor={columnColor} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
