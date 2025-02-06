import styles from "./StarRating.module.scss";
import { ReactComponent as Star } from "../../assets/star-empty.svg";
import { useState } from "react";

type StarRatingProps = {
  count?: number;
  onChange: (value: number) => void;
  propsStyles: {};
  disabled?: boolean;
};

export const StarRating = ({
  count = 5,
  onChange,
  propsStyles,
  disabled,
}: StarRatingProps) => {
  const stars = Array(count).fill(0);

  const [currentItem, setCurrentItem] = useState(-1);
  const [hoverItem, setHoverItem] = useState(-1);

  return (
    <div className={styles.rating} style={propsStyles}>
      {stars.map((elem, index) => {
        const isFill = index <= currentItem;
        const isHover = index <= hoverItem;
        return (
          <button
            key={index}
            className={styles.rating_item}
            onClick={() => {
              setCurrentItem(index);
              onChange(index + 1);
            }}
            onMouseMove={() => setHoverItem(index)}
            onMouseOut={() => setHoverItem(-1)}
            disabled={disabled}
          >
            <Star className={`${isFill || isHover ? styles.fill : ""}`} />
          </button>
        );
      })}
    </div>
  );
};
