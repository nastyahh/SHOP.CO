import styles from "./Home.module.scss";
import "../../sharedStyles.scss";
import { useRef } from "react";
import { Arrivals } from "@/components/HomeBlocks/NewArrivals/Arrivals/Arrials";
import { Collections } from "@/components/HomeBlocks/Collections/Collections";
import { ContactUs } from "@/components/HomeBlocks/ContactUs/ContactUs";
import { Banner } from "@/components/HomeBlocks/Banner/Banner";

export const Home = () => {
  const arrivalsRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="homewrap">
      <Banner />
      <div id="arrivals" className={styles.arrivals} ref={arrivalsRef}>
        <Arrivals />
      </div>
      <Collections />
      <ContactUs />
    </div>
  );
};
