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
        <textarea
          onChange={(e) => taskInfoPageStore.setComment(e.target.value)}
          className={styles.textarea}
          placeholder={
            !taskInfoPageStore.replyingTo
              ? "დაწერე კომენტარი"
              : `უპასუხე ${taskInfoPageStore.replyingToComment?.author_nickname}-ს`
          }
        />
        <button onClick={() => taskInfoPageStore.addComment()} className={styles.commentBtn}>
          დააკომენტარე
        </button>
      </div>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>კომენტარები</h2>
        <h2 className={styles.commentsCount}>{dataStore.comments.length}</h2>
      </div>
      <div className={styles.comments}>
        {dataStore.comments.map((comment) => (
          <Comment
            onClick={(id: number) => {
              taskInfoPageStore.setReplyingTo(id);
            }}
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};
export default observer(CommentsSection);
