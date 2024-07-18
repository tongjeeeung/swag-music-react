import { FC, useEffect, useRef } from "react";
import styles from './modal.module.css';
import { TModal } from './type';
import clsx from "clsx";

export const ModalUI: FC<TModal> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current === event.target as Node) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.classList.add(styles.noScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove(styles.noScroll);
    };
  }, [onClose]);

  return (
    <div className={clsx(styles.modal, styles.modal_animated, styles.modal_opened)} ref={modalRef}>
      {children}
    </div>
  );
};