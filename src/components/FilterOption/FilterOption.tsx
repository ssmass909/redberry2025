import styles from "./FilterOption.module.css";

interface FilterOptionProps {
  onChange: (checked: boolean) => void;
  optionText: string;
}

const FilterOption = ({ onChange, optionText }: FilterOptionProps) => {
  return (
    <div className={styles.main}>
      <input onChange={(e) => onChange(e.target.checked)} type="checkbox" />
      <span>{optionText}</span>
    </div>
  );
};

export default FilterOption;
