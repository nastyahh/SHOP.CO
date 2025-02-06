import { useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import styles from "./Reviews.module.scss";
import { ReactComponent as Arrow } from "../../assets/dropdown-arrow.svg";
import { ReviewForm } from "../../components/ReviewForm/ReviewForm";
import { useAppSelector } from "../../hooks/typedHooks";

export const Reviews = ({ reviews, productId }) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const [orderSort, setOrderSort] = useState("Newest");

  const sortedReviews = [...reviews].sort((a, b) => {
    if (orderSort === "Newest") {
      return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    } else {
      return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    }
  });

  const toggleSort = () => {
    setOrderSort(orderSort === "Newest" ? "Latest" : "Newest");
  };
  // console.log(reviews);
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews_header}>
        <h3 className={styles.reviews_title}>
          All Reviews{" "}
          <span className={styles.reviews_count}>({reviews.length})</span>
        </h3>
        <button className={styles.sort_btn} onClick={toggleSort}>
          {orderSort}
          <Arrow
            className={`${styles.sort_btn__arrow} ${
              orderSort === "Latest" ? styles.latest : ""
            }`}
          />
        </button>
      </div>
      <div className={styles.reviews_wrapper}>
        {sortedReviews.map((review, index) => {
          const date = review.createdAt.slice(0, 10);
          return (
            <div className={styles.reviews_item} key={index}>
              <StarRating rating={review.rate} starSize={22} />
              <p className={styles.review_name}>{review.user.username}</p>
              <p className={styles.review_descr}>{review.description}</p>
              <p className={styles.review_date}>Posted on {date}</p>
            </div>
          );
        })}
      </div>
      {isAuth && <ReviewForm productId={productId} />}
    </div>
  );
};
