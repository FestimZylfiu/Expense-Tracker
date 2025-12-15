import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        Expense Tracker <Link to='/'>GQL</Link>
      </h1>
      <div className={styles.gradientContainer}>
        <div className={styles.gradient1} />
        <div className={styles.gradient2} />
        <div className={styles.gradient3} />
        <div className={styles.gradient4} />
      </div>
    </div>
  );
};

export default Header;
