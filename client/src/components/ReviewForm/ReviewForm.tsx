import { useContext, useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import styles from "./ReviewForm.module.scss";
import { useAppSelector } from "../../hooks/typedHooks";
import "../../App.css";

import {
  useAddRatingMutation,
  useGetUserRatingQuery,
} from "../../redux/productsApi";
import { NotificationContext } from "../../HOC/NotificationProvider";

export const ReviewForm = ({ productId }: { productId: number }) => {
  const { id } = useAppSelector((state) => state.user.userData);
  const { data, refetch } = useGetUserRatingQuery({ userId: id, productId });
  const [addRating] = useAddRatingMutation();
  const [ratingData, setRatingData] = useState({
    reviewText: "",
    rate: 0,
  });

  const { showNotification } = useContext(NotificationContext);

  if (!data) return;

  const handleRatingChange = (rating: number) => {
    setRatingData({
      ...ratingData,
      rate: rating,
    });
  };

  const rateProduct = async () => {
    const result = await addRating({
      userId: id,
      productId,
      rate: ratingData.rate,
      description: ratingData.reviewText,
    });

    showNotification(result.data.message);

    setRatingData({
      reviewText: "",
      rate: 0,
    });

    refetch();
  };

  return (
    <div className={styles.reviewForm}>
      <h2 className={styles.reviewForm_title}>
        {`${
          data?.userHasRated
            ? "You can rate the product"
            : "You already rated this product"
        }`}
      </h2>
      <StarRating
        onChange={handleRatingChange}
        propsStyles={{ alignSelf: "center", margin: "10px 0 5px" }}
        disabled={!data.userHasRated}
      />
      <textarea
        name="reviewText"
        value={ratingData.reviewText}
        onChange={(e) =>
          setRatingData({ ...ratingData, reviewText: e.target.value })
        }
        disabled={!data.userHasRated}
        placeholder="Enter..."
      ></textarea>
      <button
        onClick={rateProduct}
        className={`primary-btn ${styles.reviewForm_send}`}
        disabled={!data.userHasRated}
      >
        Send
      </button>
    </div>
  );
};
