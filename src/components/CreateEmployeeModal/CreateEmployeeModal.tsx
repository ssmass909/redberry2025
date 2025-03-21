import { useEffect } from "react";
import styles from "./CreateEmployeeModal.module.css";
import { RegisterOptions, useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import { observer } from "mobx-react";
import api from "../../utils/api";
import { useCreateEmployeeModalStore, useDataStore } from "../../App";
import ValidationMessage from "../ValidationMessage/ValidationMessage";

interface CreateEmployeeFormData {
  name: string;
  surname: string;
  avatar: FileList | null;
  department_id: number;
}

const MAX_FILE_SIZE = 600 * 1024;

const CreateEmployeeModal = () => {
  const dataStore = useDataStore();
  const createEmployeeModalStore = useCreateEmployeeModalStore();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    setValue,
    getFieldState,
    formState: { errors, validatingFields },
  } = useForm<CreateEmployeeFormData>({
    reValidateMode: "onChange",
    delayError: 1500,
  });

  const avatar = watch("avatar")?.[0];
  console.log(errors);

  useEffect(() => {
    if (!avatar) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) createEmployeeModalStore.setAvatarPreviewSrc(e.target.result as string);
    };
    reader.readAsDataURL(avatar);
  }, [avatar]);

  useEffect(() => {
    if (createEmployeeModalStore.modalOpen) dataStore.fetchDepartments();
    if (!createEmployeeModalStore.modalOpen) reset();
  }, [createEmployeeModalStore.modalOpen]);

  const onSubmit = async (data: CreateEmployeeFormData) => {
    if (!avatar) return;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("department_id", data.department_id.toString());
    formData.append("avatar", avatar);
    const result = await api.post("/employees", formData);
  };

  if (!createEmployeeModalStore.modalOpen) return null;

  const validateName: RegisterOptions<CreateEmployeeFormData, "name"> = {
    required: { value: true, message: "სავალდებულო" },
    minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
    maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
    validate: {
      appropriateCharacters: (val) => {
        const res = /^[a-zA-Z\u10D0-\u10FF]+$/.test(val);
        if (res) return true;
        return "გამოიყენეთ მხოლოდ ქართული ან ლათინური ასოები";
      },
    },
    onChange: async () => {
      await trigger("name");
    },
  };

  const validateSurname: RegisterOptions<CreateEmployeeFormData, "surname"> = {
    required: { value: true, message: "სავალდებულო" },
    minLength: { value: 2, message: "მინიმუმ 2 სიმბოლო" },
    maxLength: { value: 255, message: "მაქსიმუმ 255 სიმბოლო" },
    validate: {
      appropriateCharacters: (val) => {
        const res = /^[a-zA-Z\u10D0-\u10FF]+$/.test(val);
        if (res) return true;
        return "გამოიყენეთ მხოლოდ ქართული ან ლათინური ასოები";
      },
    },
    onChange: async () => {
      await trigger("surname");
    },
  };

  const validateAvatar: RegisterOptions<CreateEmployeeFormData, "avatar"> = {
    required: {
      value: true,
      message: "სურათის ატვირთვა სავალდებულოა",
    },
    validate: {
      fileSize: (files: FileList | null): string | boolean => {
        if (!files || files.length === 0) return "სურათის ატვირთვა სავალდებულოა";
        const file = files[0];
        if (file.size > MAX_FILE_SIZE) return "სურათის ზომა უნდა იყოს მაქსიმუმ 600KB";
        return true;
      },

      fileType: (files: FileList | null): string | boolean => {
        if (!files || files.length === 0) return "სურათის ატვირთვა სავალდებულოა";
        const file = files[0];
        const acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"];
        return acceptedTypes.includes(file.type) ? true : "დასაშვებია მხოლოდ სურათის ფორმატები (JPEG, PNG, WEBP, SVG)";
      },
    },

    onChange: async () => {
      await trigger("avatar");
    },
  };

  const validateDepartment: RegisterOptions<CreateEmployeeFormData, "department_id"> = {
    required: { value: true, message: "დეპარტამენტის არჩევა სავალდებულოა" },
  };

  function getAllPossibleErrorMessages<T extends keyof CreateEmployeeFormData>(
    validateObj: RegisterOptions<CreateEmployeeFormData, T>
  ) {
    const result: string[] = [];

    const rules = validateObj as Record<string, any>;

    for (const key in rules) {
      const rule = rules[key];

      if (rule && typeof rule === "object" && "message" in rule) {
        result.push(rule.message);
      } else if (key === "validate" && typeof rule === "object") {
        for (const validateKey in rule) {
          const validateRule = rule[validateKey];
          if (typeof validateRule === "function") {
            const dummyResult = validateRule("");
            if (typeof dummyResult === "string") {
              result.push(dummyResult);
            }
          }
        }
      }
    }

    return new Array(...new Set(result));
  }

  function ValidationMessages<T extends keyof CreateEmployeeFormData>({
    field,
    registerOptions,
  }: {
    field: T;
    registerOptions: RegisterOptions<CreateEmployeeFormData, T>;
  }) {
    return getAllPossibleErrorMessages<T>(registerOptions).map((message, i) => {
      const error = getFieldState(field).error?.message === message;
      const touched = getFieldState(field).isTouched;

      return (
        <ValidationMessage
          key={`${field}_${message}_${i}`}
          status={touched ? (error ? "UNSATISFIED" : "SATISFIED") : "NEUTRAL"}
          message={message}
        />
      );
    });
  }

  return (
    <Modal open={createEmployeeModalStore.modalOpen} close={() => createEmployeeModalStore.setModalOpen(false)}>
      <button className={styles.closeBtn} onClick={() => createEmployeeModalStore.setModalOpen(false)}>
        <img className={styles.closeIcon} alt="close" src="/close_icon.svg" />
      </button>
      <div className={styles.modalContent}>
        <h1 className={styles.title}>თანამშრომლის დამატება</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="firstName">
                სახელი*
              </label>
              <input {...register("name", validateName)} className={styles.input} type="text" id="firstName" />
              <ValidationMessages field="name" registerOptions={validateName} />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="lastName">
                გვარი*
              </label>
              <input
                {...register("surname", validateSurname)}
                className={styles.input}
                type="text"
                id="lastName"
                required
              />
              <ValidationMessages field="surname" registerOptions={validateSurname} />
            </div>
          </div>

          <div className={styles.avatarUpload}>
            <label className={styles.label}>ავატარი*</label>
            <div className={styles.avatarUploadContainer}>
              {!!createEmployeeModalStore.avatarPreviewSrc ? (
                <div className={styles.avatarPreview}>
                  <img className={styles.avatar} src={createEmployeeModalStore.avatarPreviewSrc} alt="User avatar" />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => {
                      createEmployeeModalStore.setAvatarPreviewSrc(null);
                      setValue("avatar", null);
                    }}
                  >
                    <img className={styles.removeIcon} src="/remove_icon.svg" alt="remove icon" />
                  </button>
                </div>
              ) : (
                <label htmlFor="avatarInput" className={styles.avatarInputLabel}>
                  <div className={styles.avatarUploadIconContainer}>
                    <img className={styles.avatarUploadIcon} src="/upload_icon.svg" alt="Upload avatar" />
                    <span className={styles.uploadAvatarTxt}>ატვირთე ფოტო</span>
                  </div>
                  <input
                    {...register("avatar", validateAvatar)}
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                    id="avatarInput"
                    type="file"
                    className={styles.avatarInput}
                  />
                </label>
              )}
            </div>
            <ValidationMessages field="avatar" registerOptions={validateAvatar} />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="department">
              დეპარტამენტი*
            </label>
            <select {...register("department_id", validateDepartment)} className={styles.select} id="department">
              <option value=""></option>
              {dataStore.departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>
            <ValidationMessages field="department_id" registerOptions={validateDepartment} />
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={() => createEmployeeModalStore.setModalOpen(false)}
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
