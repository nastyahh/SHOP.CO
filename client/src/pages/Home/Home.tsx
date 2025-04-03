import styles from "./Home.module.scss";
import "../../sharedStyles.scss";
import { Link } from "react-router";
import { ReactComponent as CK } from "../../assets/calvin.svg";
import { ReactComponent as Prada } from "../../assets/prada.svg";
import { ReactComponent as Versace } from "../../assets/versace.svg";
import { ReactComponent as MiuMiu } from "../../assets/miu-miu.svg";
import { ReactComponent as Jacquemus } from "../../assets/jacquemus.svg";
import { ReactComponent as SaintL } from "../../assets/saint-lauren.svg";
import { ReactComponent as Guess } from "@/assets/guess.svg";
import { ReactComponent as Glamorous } from "../../assets/glamorous.svg";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/typedHooks";
import { Arrivals } from "@/components/HomeBlocks/NewArrivals/Arrivals/Arrials";
import { RunningLine } from "@/ui-components/RunningLine/RunningLine";
import { Collections } from "@/components/HomeBlocks/Collections/Collections";
import { ContactUs } from "@/components/HomeBlocks/ContactUs/ContactUs";
import { Banner } from "@/components/HomeBlocks/Banner/Banner";

export const Home = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const user = useAppSelector((state) => state.user.userData);

  const arrivalsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("is auth:", isAuth);
    console.log("user:", user);
  }, []);

  const brands = [
    {
      Logo: <CK />,
      id: 2,
    },
    {
      Logo: <Prada />,
      id: 4,
    },
    {
      Logo: <Versace />,
      id: 5,
    },
    {
      Logo: <MiuMiu />,
      id: 6,
    },
    {
      Logo: <Guess />,
      id: 12,
    },
    {
      Logo: <Jacquemus />,
      id: 8,
    },
    {
      Logo: <SaintL />,
      id: 14,
    },
    {
      Logo: <Glamorous />,
      id: 15,
    },
  ];

  return (
    <div className="homewrap">
      {/* <div className={styles.banner}>
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
        <RunningLine items={brands} />
      </div> */}
      <Banner />
      <div id="arrivals" className={styles.arrivals} ref={arrivalsRef}>
        <Arrivals />
      </div>
      <Collections />
      <ContactUs />
    </div>
  );
};
