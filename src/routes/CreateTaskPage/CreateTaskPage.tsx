import { useEffect } from "react";
import { useDataStore } from "../../App";
import styles from "./CreateTaskPage.module.css";
import { observer } from "mobx-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toJS } from "mobx";
import api from "../../utils/api";

interface TaskFormData {
  name: string;
  description: string;
  due_date: string;
  status_id: string;
  employee_id: string;
  priority_id: string;
  department: string;
}

const CreateTaskPage = () => {
  const dataStore = useDataStore();
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<TaskFormData>();

  const department = parseInt(watch("department"));
  const filteredEmployees = dataStore.employees.filter((emp) => emp.department.id === department);

  useEffect(() => {
    dataStore.fetchCreateTaskPageData();
  }, []);

  const onSubmit: SubmitHandler<TaskFormData> = async (formData) => {
    console.log("Form data:", formData);

    const response = await api.post("/tasks", formData);
    const { data } = response;
    console.log(data);
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>შექმენი ახალი დავალება</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.left}>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="name">
              სათაური<span className={styles.required}>*</span>
            </label>
            <input
              id="name"
              className={styles.input}
              placeholder="ჩაწერეთ დავალების სათაური"
              {...register("name", { required: true })}
            />
            {errors.name && <span className={styles.errorText}>სათაური აუცილებელია</span>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="description">
              აღწერა
            </label>
            <textarea id="description" className={styles.textarea} rows={6} {...register("description")} />
          </div>
          <div className={styles.formSection}>
            <div className={styles.formRow}>
              <div className={styles.formSection}>
                <label className={styles.label} htmlFor="priority">
                  პრიორიტეტი<span className={styles.required}>*</span>
                </label>
                <select id="priority" className={styles.select} {...register("priority_id", { required: true })}>
                  {dataStore.priorities.map((prio) => (
                    <option key={prio.id} value={prio.id}>
                      {prio.name}
                    </option>
                  ))}
                </select>
                {errors.priority_id && <span className={styles.errorText}>პრიორიტეტი აუცილებელია</span>}
              </div>

              <div className={styles.formSection}>
                <label className={styles.label} htmlFor="status">
                  სტატუსი<span className={styles.required}>*</span>
                </label>
                <select id="status" className={styles.select} {...register("status_id", { required: true })}>
                  {dataStore.taskStatuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
                {errors.status_id && <span className={styles.errorText}>სტატუსი აუცილებელია</span>}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="department">
              დეპარტამენტი<span className={styles.required}>*</span>
            </label>
            <select
              id="department"
              className={styles.select}
              {...register("department", {
                required: true,
                onChange: async () => {
                  await trigger("department");
                },
              })}
            >
              <option value={-999} disabled>
                აირჩიეთ დეპარტამენტი
              </option>
              {dataStore.departments?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.department && <span className={styles.errorText}>დეპარტამენტი აუცილებელია</span>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="responsible">
              პასუხისმგებელი თანამშრომელი<span className={styles.required}>*</span>
            </label>
            <select id="responsible" className={styles.select} {...register("employee_id", { required: true })}>
              <option value="" disabled>
                {department === undefined || department === -999 ? "აირჩიეთ დეპარტამენტი" : "აირჩიეთ თანამშრომელი"}
              </option>
              {filteredEmployees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            {errors.employee_id && <span className={styles.errorText}>თანამშრომელი აუცილებელია</span>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="deadline">
              დედლაინი
            </label>
            <input id="deadline" className={styles.input} type="date" {...register("due_date")} />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              დავალების შექმნება
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default observer(CreateTaskPage);
