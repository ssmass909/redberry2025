import Chip from "../Chip/Chip";
import styles from "./ChipGroup.module.css";

type SingleChipGroupProp = {
  info: { id: number; title: string }[];
  onDelete: (id: number) => void;
};

type ChipGroupProps = {
  data: SingleChipGroupProp[];
};

const ChipGroup = ({ data }: ChipGroupProps) => {
  return (
    <div className={styles.main}>
      {data.map((data) =>
        data.info.map((info) => <Chip key={info.id} title={info.title} onDelete={() => data.onDelete} id={0} />)
      )}
    </div>
  );
};

export default ChipGroup;
