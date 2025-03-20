import { useContext } from "react";
import { FilterOptionType } from "../../types";
import styles from "./FilterOption.module.css";
import { observer } from "mobx-react";
import { TasksPageStoreContext } from "../../routes/TasksPage/TasksPage";
import AvatarIcon from "../AvatarIcon/AvatarIcon";

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
        checked={tasksPageStore
          .getCurrentFilter()
          ?.tempFilter.map((e) => e.id)
          .includes(filterOption.id)}
        onChange={(e) => onChange(e.target.checked)}
        type="checkbox"
      />
      <span className={styles.checkmark}></span>
      {filterOption.avatar && <AvatarIcon avatarSrc={filterOption.avatar} />}
      <span className={styles.title}>{`${filterOption.name} ${filterOption.surname ? filterOption.surname : ""}`}</span>
    </div>
  );
};

export default observer(FilterOption);
