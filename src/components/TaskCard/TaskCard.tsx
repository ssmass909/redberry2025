import styles from "./TaskCard.module.css";

interface TaskCardProps {
  id: number;
  borderColor: string;
  departmentColor: string;
}

const TaskCard = ({ id, borderColor, departmentColor }: TaskCardProps) => {
  return (
    <div style={{ borderColor: borderColor }} className={styles.main}>
      <div className={styles.top}>
        <div className={styles.priority} style={{ borderColor: "red" }}>
          <img src="test.svg" alt="priority icon" className={styles.priorityIcon} />
          <span className={styles.priorityText}>საშუალო</span>
        </div>
        <span className={styles.department} style={{ backgroundColor: departmentColor }}>
          დიზაინი
        </span>
        <span className={styles.dueDate}> 22 იანვ, 2022 </span>
      </div>
      <div className={styles.middle}>
        <h1 className={styles.title}>Redberry-ს საიტის ლენდინგის დიზაინი </h1>
        <span className={styles.description}>
          შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას.
        </span>
      </div>
      <div className={styles.bottom}>
        <img
          className={styles.avatar}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s"
          alt="employee avatar"
        />
        <div className={styles.comments}>
          <img className={styles.commentsIcon} src="comments_icon.svg" alt="comments" />
          <span className={styles.commentsCount}>8</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
