import { PriorityName, PriorityType } from "../types";
import { PRIORITY_COLORS } from "../utils/constants";
import styles from "./Priority.module.css";

interface PriorityProps {
  priority: PriorityType;
}

const Priority = ({ priority }: PriorityProps) => {
  if (!(priority.name in PRIORITY_COLORS)) throw new Error("invalid priority name!");
  return (
    <div
      className={styles.main}
      style={{
        borderColor: PRIORITY_COLORS[priority.name as PriorityName],
      }}
    >
      <img src={priority.icon} alt="priority icon" className={styles.priorityIcon} />
      <span className={styles.priorityText}>{priority.name}</span>
    </div>
  );
};

export default Priority;
