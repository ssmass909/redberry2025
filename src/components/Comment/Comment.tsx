import { CommentType } from "../../types";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import styles from "./Comment.module.css";

interface CommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <>
      <div className={styles.main} style={{ marginLeft: !!comment.parent_id ? "53px" : undefined }}>
        <div className={styles.left}>
          <AvatarIcon avatarSrc={comment.author_avatar} />
        </div>
        <div className={styles.right}>
          <span className={styles.name}>{comment.author_nickname}</span>
          <p className={styles.comment}>{comment.text}</p>
          <button className={styles.btn}>
            <img className={styles.replyIcon} src="/reply_icon.svg" alt="reply icon" />
            უპასუხე
          </button>
        </div>
      </div>
      {comment.sub_comments && comment.sub_comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </>
  );
};

export default Comment;
