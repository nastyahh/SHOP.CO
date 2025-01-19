import styles from "./Counter.module.scss";
import { ReactComponent as Minus } from "../../assets/minus.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { CounterProps } from "../../types";

export const Counter = ({ count, setCount }: CounterProps) => {
  const handleDecrement = () => {
    setCount((prev: number) => Math.max(prev - 1, 0));
  };

  const handleIcrement = () => {
    setCount((prev: number) => prev + 1);
  };

  return (
    <div className={styles.counter}>
      <button onClick={handleDecrement}>
        <Minus />
      </button>
      <div className={styles.counter_num}>{count}</div>
      <button onClick={handleIcrement}>
        <Plus />
      </button>
    </div>
  );
};
