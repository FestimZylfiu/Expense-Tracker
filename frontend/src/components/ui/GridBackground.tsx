import { ReactNode } from "react";
import styles from "./GridBackground.module.css";

interface GridBackgroundProps {
  children: ReactNode;
}

const GridBackground = ({ children }: GridBackgroundProps) => {
  return (
    <div className={styles.gridBackground}>
      <div className={styles.overlay}></div>
      {children}
    </div>
  );
};

export default GridBackground;
