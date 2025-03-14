import { Task } from "../../types";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
  borderColor: string;
  departmentColor: string;
}

const TaskCard = ({ task, borderColor, departmentColor }: TaskCardProps) => {
  return (
    <div style={{ borderColor: borderColor }} className={styles.main}>
      <div className={styles.top}>
        <div className={styles.priority} style={{ borderColor: "red" }}>
          <img src={task.priority.icon} alt="priority icon" className={styles.priorityIcon} />
          <span className={styles.priorityText}>{task.priority.name}</span>
        </div>
        <span className={styles.department} style={{ backgroundColor: departmentColor }}>
          {task.department.name}
        </span>
        <span className={styles.dueDate}> {task.due_date} </span>
      </div>
      <div className={styles.middle}>
        <h1 className={styles.title}>{task.name} </h1>
        <span className={styles.description}>{task.description}</span>
      </div>
      <div className={styles.bottom}>
        <img className={styles.avatar} src={task.employee.avatar} alt="employee avatar" />
        <div className={styles.comments}>
          <img className={styles.commentsIcon} src="comments_icon.svg" alt="comments" />
          <span className={styles.commentsCount}>{task.total_comments}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
