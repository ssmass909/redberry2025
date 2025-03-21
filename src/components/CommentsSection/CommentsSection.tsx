import { observer } from "mobx-react";
import TaskInfoPageStore from "../../stores/TaskInfoPageStore";
import styles from "./CommentsSection.module.css";
import { useDataStore } from "../../App";
import Comment from "../Comment/Comment";

export interface CommentsSectionProps {
  taskInfoPageStore: TaskInfoPageStore;
}

const CommentsSection = ({ taskInfoPageStore }: CommentsSectionProps) => {
  const dataStore = useDataStore();
  return (
    <div className={styles.main}>
      <div className={styles.textareaContainer}>
        <textarea className={styles.textarea} placeholder="დაწერე კომენტარი" />
        <button className={styles.commentBtn}>დააკომენტარე</button>
      </div>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>კომენტარები</h2>
        <h2 className={styles.commentsCount}>{dataStore.comments.length}</h2>
      </div>
      <div className={styles.comments}>
        {dataStore.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
export default observer(CommentsSection);
