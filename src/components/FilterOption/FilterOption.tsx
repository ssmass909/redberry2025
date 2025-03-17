import { useContext } from "react";
import { FilterOptionType } from "../../types";
import styles from "./FilterOption.module.css";
import { observer } from "mobx-react";
import { TasksPageStoreContext } from "../../routes/TasksPage/TasksPage";

interface FilterOptionProps {
  filterOption: FilterOptionType;
}

const FilterOption = ({ filterOption }: FilterOptionProps) => {
  const tasksPageStore = useContext(TasksPageStoreContext);

  const onChange = (checked: boolean) => {
    tasksPageStore.updateFilter(checked ? "ADD" : "REMOVE", filterOption.id);
  };

  return (
    <div className={styles.main}>
      <input
        checked={tasksPageStore.currentFilter?.tempFilter.map((e) => e.id).includes(filterOption.id)}
        onChange={(e) => onChange(e.target.checked)}
        type="checkbox"
      />
      <span>{filterOption.name}</span>
    </div>
  );
};

export default observer(FilterOption);
