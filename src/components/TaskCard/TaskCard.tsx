import { PriorityName, Task } from "../../types";
import { abbreviateText, getGeorgianDate } from "../../utils/functions";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
  borderColor: string;
  departmentColor: string;
}

const PRIORITY_COLORS = {
  დაბალი: "#08A508",
  საშუალო: "#FFBE0B",
  მაღალი: "#FA4D4D",
};

const TaskCard = ({ task, borderColor, departmentColor }: TaskCardProps) => {
  return (
    <div style={{ borderColor: borderColor }} className={styles.main}>
      <div className={styles.top}>
        <div
          className={styles.priority}
          style={{
            borderColor:
              task.priority.name in PRIORITY_COLORS ? PRIORITY_COLORS[task.priority.name as PriorityName] : "",
          }}
        >
          <img src={task.priority.icon} alt="priority icon" className={styles.priorityIcon} />
          <span className={styles.priorityText}>{task.priority.name}</span>
        </div>
        <span className={styles.department} style={{ backgroundColor: departmentColor }}>
          {abbreviateText(task.department.name, 12)}
        </span>
        <span className={styles.dueDate}> {getGeorgianDate(task.due_date)} </span>
      </div>
      <div className={styles.middle}>
        <h1 className={styles.title}>{task.name} </h1>
        <span className={styles.description}>
          {`${task.description.substring(0, 100)}${task.description.length > 100 ? "..." : ""}`}
        </span>
      </div>
      <div className={styles.bottom}>
        <AvatarIcon avatarSrc={task.employee.avatar} />
        <div className={styles.comments}>
          <img className={styles.commentsIcon} src="comments_icon.svg" alt="comments" />
          <span className={styles.commentsCount}>{task.total_comments}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
