import { ReactNode, useEffect } from "react";
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

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

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
