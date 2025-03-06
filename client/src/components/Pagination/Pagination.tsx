import styles from "./Pagination.module.scss";
import { ReactComponent as Arrow } from "../../assets/arrow-next.svg";

export const Pagination = ({ page, setPage, totalCountPages }) => {
  const pageLimit = 5;

  const startPage = Math.max(1, page - Math.floor(pageLimit / 2));
  const endPage = Math.min(totalCountPages, startPage + pageLimit - 1);

  const totalPages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pagination_btn} ${styles.prev}`}
        onClick={() => {
          setPage((prevPage: number) => {
            return Math.max(1, prevPage - 1);
          });
        }}
        disabled={page <= 1}
      >
        <Arrow />
        Previous
      </button>
      <div className={styles.pagination_pages}>
        {totalPages.map((p) => (
          <button
            className={`${styles.pagination_pageButton} ${
              p == page && styles.active
            }`}
            onClick={() => {
              setPage(p);
            }}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        className={styles.pagination_btn}
        onClick={() =>
          setPage((prevPage) => Math.min(totalCountPages, prevPage + 1))
        }
        disabled={page >= totalCountPages}
      >
        <Arrow />
        Next
      </button>
    </div>
  );
};
