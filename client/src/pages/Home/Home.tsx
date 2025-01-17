import styles from "./Home.module.scss";
import "../../sharedStyles.scss";
import { Link } from "react-router";
import { ReactComponent as Zara } from "../../assets/zara.svg";
import { ReactComponent as CK } from "../../assets/calvin.svg";
import { ReactComponent as Celine } from "../../assets/celine.svg";
import { ReactComponent as Prada } from "../../assets/prada.svg";
import { ReactComponent as Versace } from "../../assets/versace.svg";
import { Arrivals } from "../../components/HomeBlocks/NewArrivals/Arrials";

export const Home = () => {
  return (
    <div className="homewrap">
      <div className={styles.banner}>
        <div className={styles.banner_info}>
          <div className="container">
            <h1 className={styles.banner_title}>
              FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
            </h1>
            <p className={styles.banner_textSmall}>
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <Link to="/catalog" className={`primary-btn ${styles.banner_btn}`}>
              Shop Now
            </Link>
            <div className={styles.banner_numbers}>
              <div className={styles.banner_numbers__item}>
                <p className={styles.banner_numbers__count}>100+</p>
                <p className={styles.banner_numbers__descr}>
                  International Brands
                </p>
              </div>
              <div className={styles.banner_numbers__item}>
                <p className={styles.banner_numbers__count}>2,000+</p>
                <p className={styles.banner_numbers__descr}>
                  High-Quality Products
                </p>
              </div>
              <div className={styles.banner_numbers__item}>
                <p className={styles.banner_numbers__count}>1000+</p>
                <p className={styles.banner_numbers__descr}>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.runningLine}>
          <div className={styles.runningLine_wrap}>
            <Zara className={styles.runningLine_item} />
            <CK className={styles.runningLine_item} />
            <Celine className={styles.runningLine_item} />
            <Prada className={styles.runningLine_item} />
            <Versace className={styles.runningLine_item} />
          </div>
        </div>
      </div>
      <div id="arrivals" className={styles.arrivals}>
        <Arrivals />
      </div>
    </div>
  );
};
