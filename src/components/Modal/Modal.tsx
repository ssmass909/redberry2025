import { ReactNode } from "react";
import useOutsideClick from "../../utils/useOutsideClick";
import styles from "./Modal.module.css";

export interface ModalProps {
  open: boolean;
  close: () => void;
  children: ReactNode;
}

const Modal = ({ open, children, close }: ModalProps) => {
  const modalBodyRef = useOutsideClick<HTMLDivElement>(() => {
    close();
  });

  if (!open) return null;
  return (
    <div className={styles.main}>
      <div ref={modalBodyRef} className={styles.modalBody}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
