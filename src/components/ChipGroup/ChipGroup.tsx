import { useContext } from "react";
import { ActiveFilter } from "../../types";
import Chip from "../Chip/Chip";
import styles from "./ChipGroup.module.css";
import { TasksPageStoreContext } from "../../routes/TasksPage/TasksPage";

type ChipGroupProps = {
  filters: ActiveFilter[];
};

const ChipGroup = ({ filters }: ChipGroupProps) => {
  const tasksPageStore = useContext(TasksPageStoreContext);

  return (
    <div className={styles.main}>
      {filters.map((filter) => {
        const currentFilter = tasksPageStore.getCurrentFilter(filter);
        const data = currentFilter.filter.map((filter) => {
          return { id: filter.id, title: filter.name };
        });

        const onDelete = (id: number) => {
          currentFilter.updateFilter("REMOVE", id);
          currentFilter.updateFilter("APPLY", id);
        };

        return data.map((data) => <Chip key={data.id} {...data} onDelete={onDelete} />);
      })}
      {!tasksPageStore.filtersEmpty && (
        <button
          className={styles.clearBtn}
          onClick={() => {
            filters.forEach((filter) => {
              tasksPageStore.getCurrentFilter(filter).updateFilter("RESET");
              tasksPageStore.getCurrentFilter(filter).updateFilter("APPLY");
            });
          }}
        >
          გასუფთავება
        </button>
      )}
    </div>
  );
};

export default ChipGroup;
