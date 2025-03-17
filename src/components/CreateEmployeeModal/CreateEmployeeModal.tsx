import { useContext, useEffect, useState } from "react";
import styles from "./CreateEmployeeModal.module.css";
import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import { TasksPageStoreContext } from "../../App";
import { observer } from "mobx-react";
import api from "../../utils/api";

interface CreateEmployeeFormData {
  name: string;
  surname: string;
  avatar: FileList;
  department_id: number;
}

const CreateEmployeeModal = () => {
  const tasksPageStore = useContext(TasksPageStoreContext);
  const [avatarPrevSrc, setAvatarPrevSrc] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateEmployeeFormData>();

  const avatar = watch("avatar")?.[0];

  useEffect(() => {
    if (!avatar) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) setAvatarPrevSrc(e.target.result as string);
    };
    reader.readAsDataURL(avatar);
  }, [avatar]);

  const onSubmit = async (data: CreateEmployeeFormData) => {
    if (!avatar) return;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("department_id", data.department_id.toString());
    formData.append("avatar", avatar);

    const result = await api.post("/employees", formData);
  };

  if (!tasksPageStore.createEmployeeModalOpen) return null;
  return (
    <Modal open={tasksPageStore.createEmployeeModalOpen} close={() => tasksPageStore.setCreateEmployeeModalOpen(false)}>
      <button className={styles.closeBtn} onClick={() => tasksPageStore.setCreateEmployeeModalOpen(false)}>
        <img className={styles.closeIcon} alt="close" src="close_icon.svg" />
      </button>
      <div className={styles.modalContent}>
        <h1 className={styles.title}>თანამშრომლის დამატება</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="firstName">
                სახელი*
              </label>
              <input {...register("name")} className={styles.input} type="text" id="firstName" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="lastName">
                გვარი*
              </label>
              <input {...register("surname")} className={styles.input} type="text" id="lastName" required />
            </div>
          </div>

          <div className={styles.avatarUpload}>
            <label className={styles.label}>ავატარი*</label>
            <div className={styles.avatarUploadContainer}>
              {!!avatarPrevSrc ? (
                <div className={styles.avatarPreview}>
                  <img className={styles.avatar} src={avatarPrevSrc} alt="User avatar" />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => {
                      setAvatarPrevSrc(null);
                      (document.getElementById("avatarInput") as HTMLInputElement).value = "";
                    }}
                  >
                    <img className={styles.removeIcon} src="remove_icon.svg" alt="remove icon" />
                  </button>
                </div>
              ) : (
                <label htmlFor="avatarInput" className={styles.avatarInputLabel}>
                  <div className={styles.avatarUploadIconContainer}>
                    <img className={styles.avatarUploadIcon} src="upload_icon.svg" alt="Upload avatar" />
                    <span className={styles.uploadAvatarTxt}>ატვირთე ფოტო</span>
                  </div>
                  <input
                    {...register("avatar")}
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                    id="avatarInput"
                    type="file"
                    className={styles.avatarInput}
                  />
                </label>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="department">
              დეპარტამენტი*
            </label>
            <select {...register("department_id")} className={styles.select} id="department" required>
              <option value=""></option>
              {tasksPageStore.departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={() => tasksPageStore.setCreateEmployeeModalOpen(false)}
              type="button"
              className={`${styles.btn} ${styles.outlinedBtn}`}
            >
              გაუქმება
            </button>
            <button type="submit" className={`${styles.btn} ${styles.filledBtn}`}>
              დაამატე თანამშრომელი
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default observer(CreateEmployeeModal);
