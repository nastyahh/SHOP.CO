import styles from "./Counter.module.scss";
import { ReactComponent as Minus } from "../../assets/minus.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { CounterProps } from "../../types";

export const Counter = ({ count, onChange }: CounterProps) => {
  return (
    <div className={styles.counter}>
      <button onClick={() => onChange(Math.max(count - 1, 0))}>
        <Minus />
      </button>
      <div className={styles.counter_num}>{count}</div>
      <button onClick={() => onChange(count + 1)}>
        <Plus />
      </button>
    </div>
  );
};
