import { Link } from "react-router";
import { Task } from "../../types";
import { getGeorgianDate } from "../../utils/functions";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import styles from "./TaskCard.module.css";
import Priority from "../../Priority/Priority";
import Department from "../Department/Department";

interface TaskCardProps {
  task: Task;
  borderColor: string;
}

const TaskCard = ({ task, borderColor }: TaskCardProps) => {
  return (
    <Link style={{ all: "unset" }} to={`/task/${task.id}`}>
      <div style={{ borderColor: borderColor }} className={styles.main}>
        <div className={styles.top}>
          <Priority priority={task.priority} />
          <Department id={task.department.id} name={task.department.name} />
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
    </Link>
  );
};

export default TaskCard;
