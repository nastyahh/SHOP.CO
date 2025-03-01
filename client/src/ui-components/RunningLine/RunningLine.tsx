import { Link } from "react-router";
import styles from "./RunningLine.module.scss";

export const RunningLine = ({ items }) => {
  return (
    <div className={styles.runningLine}>
      <div className={styles.runningLine_wrap}>
        {items.map(({ id, Logo }) => (
          <Link
            to={`/catalog?brandId=${id}`}
            className={styles.runningLine_item}
          >
            {Logo}
          </Link>
        ))}
      </div>
    </div>
  );
};
