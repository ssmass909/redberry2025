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

const TaskInfoPage = () => {
  let { id } = useParams();
  if (!id) throw new Error("Task id not present!");

  const dataStore = useDataStore();

  useEffect(() => {
    dataStore.fetchStatuses();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.overview}>
          <div className={styles.overview_top}>
            <Priority priority={{ icon: "", id: -1, name: "საშუალო" }} />
            <Department id={1} name={"დიზაინი"} />
          </div>
          <h1 className={styles.title}>Redberry-ს საიტის ლენდინგის დიზაინი</h1>
        </div>
        <div className={styles.desciption}>
          მიზანია რომ შეიქმნას თანამედროვე, სუფთა და ფუნქციონალური დიზაინი, რომელიც უზრუნველყოფს მარტივ ნავიგაციას და
          მკაფიო ინფორმაციის გადაცემას. დიზაინი უნდა იყოს ადაპტირებადი (responsive), გამორჩეული ვიზუალით, მინიმალისტური
          სტილით და ნათელი ტიპოგრაფიით.
        </div>
        <div className={styles.details}>
          <h3 className={styles.detailsTitle}>დავალების დეტალები</h3>
          <div className={styles.detailsContainer}>
            <div className={styles.taskDetail}>
              <div className={styles.detailName}>
                <img className={styles.detailIcon} src="/status_icon.svg" alt="status icon" />
                <span className={styles.detailTitle}>სტატუსი</span>
              </div>
              <div className={styles.detailInfo}>
                <select className={styles.detail_taskStatus}>
                  <option value=""></option>
                  {dataStore.taskStatuses.map((status) => (
                    <option key={status.id} value={status.id}>
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
                  <AvatarIcon
                    avatarSrc={
                      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                    }
                  />
                  <div className={styles.detail_employee_info}>
                    <span className={styles.detail_employee_department}>
                      {abbreviateText("დიზაინის დეპარტამენტი", 12)}
                    </span>
                    <span className={styles.detail_employee_name}>ელაია ბაგრატიონი</span>
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
        <CommentsSection />
      </div>
    </div>
  );
};

export default observer(TaskInfoPage);
