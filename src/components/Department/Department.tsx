import { departmentColors } from "../../utils/constants";
import { abbreviateText } from "../../utils/functions";
import styles from "./Department.module.css";

interface DepartmentProps {
  id: number;
  name: string;
}

const Department = ({ name, id }: DepartmentProps) => {
  return (
    <span className={styles.main} style={{ backgroundColor: departmentColors[id] }}>
      {abbreviateText(name, 12)}
    </span>
  );
};

export default Department;
