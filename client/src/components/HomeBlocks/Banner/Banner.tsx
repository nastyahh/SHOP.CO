import Slider from "react-slick";
import styles from "../../../pages/Home/Home.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

export const Banner = () => {
  var settings = {
    dots: true,
    loop: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1100,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };

  return (
    <div className="">
      <Slider {...settings}>
        <div className={`${styles.slider__item} ${styles.banner}`}>
          <div className={styles.banner_info}>
            <div className="container">
              <h1 className={styles.banner_title}>
                FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
              </h1>
              <p className={styles.banner_textSmall}>
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <Link
                to="/catalog"
                className={`primary-btn ${styles.banner_btn}`}
              >
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
                  <p className={styles.banner_numbers__descr}>
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.slider__item} ${styles.second} `}>
          <div className={styles.banner_info}>
            <div className="container">
              <h1 className={styles.banner_title}>
                {" "}
                FOR <span>SHE</span>
              </h1>
              <p className={styles.banner_textSmall}>
                Style. Comfort. Quality.
              </p>
              <Link
                to="/catalog?gender=female"
                className={`primary-btn ${styles.banner_btn}`}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        <div className={`${styles.slider__item} ${styles.third}`}>
          <div className={styles.banner_info}>
            <div className="container">
              <h1 className={styles.banner_title}>
                {" "}
                FOR <span>HIM</span>
              </h1>
              <p className={styles.banner_textSmall}>
                Discover the latest trends in men's fashion.
              </p>
              <Link
                to="/catalog?gender=male"
                className={`primary-btn ${styles.banner_btn}`}
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};
