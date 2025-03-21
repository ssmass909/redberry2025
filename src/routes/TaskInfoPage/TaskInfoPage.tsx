import { useParams } from "react-router";
import CommentsSection from "../../components/CommentsSection/CommentsSection";
import Priority from "../../Priority/Priority";
import styles from "./TaskInfoPage.module.css";
import Department from "../../components/Department/Department";
import { useDataStore } from "../../App";
import { useEffect } from "react";
import { observer } from "mobx-react";
import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import { abbreviateText, getGeorgianDates } from "../../utils/functions";
import TaskInfoPageStore from "../../stores/TaskInfoPageStore";

const TaskInfoPage = () => {
  let { id } = useParams();
  if (!id) throw new Error("Task id not present!");

  const dataStore = useDataStore();
  const taskInfoPageStore = new TaskInfoPageStore(dataStore.task, dataStore.comments);
  useEffect(() => {
    dataStore.fetchTaskInfoPageData(id);

    return () => {
      dataStore.setComments([]);
      dataStore.setTask(undefined);
    };
  }, []);

  if (!dataStore.task) return null;

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.overview}>
          <div className={styles.overview_top}>
            <Priority priority={dataStore.task.priority} />
            <Department id={1} name={"დიზაინი"} />
          </div>
          <h1 className={styles.title}>{dataStore.task.name}</h1>
        </div>
        <div className={styles.desciption}>{dataStore.task.description}</div>
        <div className={styles.details}>
          <h3 className={styles.detailsTitle}>დავალების დეტალები</h3>
          <div className={styles.detailsContainer}>
            <div className={styles.taskDetail}>
              <div className={styles.detailName}>
                <img className={styles.detailIcon} src="/status_icon.svg" alt="status icon" />
                <span className={styles.detailTitle}>სტატუსი</span>
              </div>
              <div className={styles.detailInfo}>
                <select
                  onChange={(e) => taskInfoPageStore.changeTaskStatus(e.target.value)}
                  className={styles.detail_taskStatus}
                >
                  <option value=""></option>
                  {dataStore.taskStatuses.map((status) => (
                    <option selected={dataStore.task?.status.id === status.id} key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.taskDetail}>
              <div className={styles.detailName}>
                <img className={styles.detailIcon} src="/employee_icon.svg" alt="employee icon" />
                <span className={styles.detailTitle}>თანამშრომელი</span>
              </div>
              <div className={styles.detailInfo}>
                <div className={styles.detail_employee}>
                  <AvatarIcon avatarSrc={dataStore.task.employee.avatar} />
                  <div className={styles.detail_employee_info}>
                    <span className={styles.detail_employee_department}>
                      {abbreviateText(dataStore.task.department.name, 25)}
                    </span>
                    <span
                      className={styles.detail_employee_name}
                    >{`${dataStore.task.employee.name} ${dataStore.task.employee.surname}`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.taskDetail}>
              <div className={styles.detailName}>
                <img className={styles.detailIcon} src="/dueDate_icon.svg" alt="due date icon" />
                <span className={styles.detailTitle}>დავალების ვადა</span>
              </div>
              <div className={styles.detailInfo}>
                <span className={styles.detail_dueDate}>{getGeorgianDates(new Date().toISOString()).taskInfoPage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <CommentsSection taskInfoPageStore={taskInfoPageStore} />
      </div>
    </div>
  );
};

export default observer(TaskInfoPage);
