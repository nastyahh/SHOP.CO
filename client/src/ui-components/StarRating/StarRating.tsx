import styles from "./StarRating.module.scss";
import { ReactComponent as StarFill } from "../../assets/star-fill.svg";
import { ReactComponent as StarEmpty } from "../../assets/star-empty.svg";
import { ReactComponent as StarHalf } from "../../assets/star-half.svg";

export const StarRating = ({
  rating,
  starSize,
}: {
  rating: number;
  starSize: number;
}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={styles.rating}>
      <div className={styles.rating_stars}>
        {[...Array(fullStars)].map((_, index) => (
          <StarFill
            key={`full-${index}`}
            className={`${styles.rating_starFill} ${styles.rating_star}`}
            style={{ width: `${starSize}px` }}
          />
        ))}
        {halfStar && (
          <StarHalf
            className={styles.rating_star}
            style={{ width: `${starSize}px` }}
          />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <StarEmpty
            key={`empty-${index}`}
            className={`${styles.rating_starEmpty} ${styles.rating_star}`}
            style={{ width: `${starSize}px` }}
          />
        ))}
      </div>
      <div className={styles.rating_num}>
        {rating}/<span>5</span>
      </div>
    </div>
  );
};
