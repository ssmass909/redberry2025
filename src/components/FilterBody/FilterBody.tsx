import { useContext } from "react";
import { TasksPageStoreContext } from "../../routes/TasksPage/TasksPage";
import FilterOption from "../FilterOption/FilterOption";
import styles from "./FilterBody.module.css";

interface FilterBodyProps {
  filterValues: string[];
}

const FilterBody = ({ filterValues }: FilterBodyProps) => {
  const tasksPageStore = useContext(TasksPageStoreContext);

  return (
    <div className={styles.main}>
      {filterValues.map((val) => (
        <FilterOption onChange={(checked) => {}} optionText={val} />
      ))}
    </div>
  );
};

export default FilterBody;
