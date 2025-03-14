import { useContext } from "react";
import FilterOption from "../FilterOption/FilterOption";
import styles from "./FilterBody.module.css";
import { TasksPageStoreContext } from "../../routes/TasksPage/TasksPage";
import { observer } from "mobx-react";
import useOutsideClick from "../../utils/useOutsideClick";

const FilterBody = () => {
  const tasksPageStore = useContext(TasksPageStoreContext);
  const ref = useOutsideClick<HTMLDivElement>(() => {
    tasksPageStore.updateFilter("RESET", 0);
    tasksPageStore.setActiveFilter(null);
  });

  if (tasksPageStore.activeFilter === null) return null;
  return (
    <div ref={ref} className={styles.main}>
      <div className={styles.optionsContainer}>
        {tasksPageStore.currentFilterInfo.options.map((val) => (
          <FilterOption filterOption={val} key={val.id} />
        ))}
      </div>
      <button onClick={() => tasksPageStore.updateFilter("APPLY", 0)} className={styles.btn}>
        არჩევა
      </button>
    </div>
  );
};

export default observer(FilterBody);
