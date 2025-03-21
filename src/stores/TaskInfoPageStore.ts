import { action, makeObservable, observable } from "mobx";
import { CommentType, Task } from "../types";
import api from "../utils/api";

class TaskInfoPageStore {
  comment = "";
  replyingTo: number | null = null;
  task?: Task;
  comments: CommentType[] = [];

  constructor(task: Task | undefined, comments: CommentType[]) {
    this.comments = comments;
    this.task = task;
    makeObservable(this, {
      comment: observable,
      replyingTo: observable,
      setComment: action,
      setReplyingTo: action,
      addComment: action,
      setTask: action,
    });
  }

  get replyingToComment() {
    if (!this.replyingTo) return null;
    return this.comments.filter((c) => c.id === this.replyingTo)[0];
  }

  setTask(newValue: Task) {
    this.task = newValue;
  }

  setComment(newValue: string) {
    this.comment = newValue;
  }

  setReplyingTo(newValue: number | null) {
    this.replyingTo = newValue;
  }

  async addComment() {
    if (!this.task) return;
    try {
      const response = await api.post<CommentType>(`/tasks/${this.task?.id}/comments`, {
        parent_id: this.replyingTo,
        text: this.comment,
      });
      this.comments.unshift(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  async changeTaskStatus(status: number | string) {
    if (!this.task || !status) return;
    try {
      const response = await api.put<Task>(`/tasks/${this.task?.id}`, { status_id: status });
      this.setTask(response.data);
    } catch (e) {
      console.error(e);
    }
  }
}

export default TaskInfoPageStore;
