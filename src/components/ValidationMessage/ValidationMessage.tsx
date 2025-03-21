import styles from "./ValidationMessage.module.css";

type ValidationStatus = "SATISFIED" | "NEUTRAL" | "UNSATISFIED";

const getStatusColor = (status: ValidationStatus) => {
  let color = "#6C757D";
  if (status === "SATISFIED") color = "#08A508";
  if (status === "UNSATISFIED") color = "#FA4D4D";
  return color;
};

const CheckMark = ({ status }: { status: ValidationStatus }) => {
  const color = getStatusColor(status);

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.3327 4L5.99935 11.3333L2.66602 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface ValidationMessageProps {
  message?: string;
  status: ValidationStatus;
}

const ValidationMessage = ({ message, status }: ValidationMessageProps) => {
  return (
    <div className={styles.main}>
      <CheckMark status={status} />
      <span style={{ color: getStatusColor(status) }} className={styles.message}>
        {message}
      </span>
    </div>
  );
};

export default ValidationMessage;
