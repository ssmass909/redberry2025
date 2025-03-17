import { action, makeObservable, observable } from "mobx";

class CreateEmployeeModalStore {
  modalOpen = false;
  avatarPreviewSrc: string | null = null;

  constructor() {
    makeObservable(this, {
      modalOpen: observable,
      avatarPreviewSrc: observable,
      setAvatarPreviewSrc: action,
      setModalOpen: action,
    });
  }

  setModalOpen(newValue: boolean) {
    this.modalOpen = newValue;
  }

  setAvatarPreviewSrc(newValue: typeof this.avatarPreviewSrc) {
    this.avatarPreviewSrc = newValue;
  }
}

export default CreateEmployeeModalStore;
