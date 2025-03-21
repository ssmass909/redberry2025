import { makeObservable } from "mobx";

class TaskInfoPageStore {
  constructor() {
    makeObservable(this, {});
  }
}

export default TaskInfoPageStore;
