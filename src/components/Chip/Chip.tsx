import styles from "./Chip.module.css";

export interface ChipProps {
  onDelete: (id: number) => void;
  title: string;
  id: number;
}

const Chip = ({ onDelete, title, id }: ChipProps) => {
  return (
    <div className={styles.main}>
      <span className={styles.title}>{title}</span>
      <button onClick={() => onDelete(id)} className={styles.delBtn}>
        <img className={styles.delIcon} src="x_icon.svg" alt="delete filter option" />
      </button>
    </div>
  );
};

export default Chip;
