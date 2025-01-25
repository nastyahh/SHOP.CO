import "../../sharedStyles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { ReactComponent as Profile } from "../../assets/profile.svg";
import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";
import styles from "./Header.module.scss";
import { Link } from "react-router";
import { Link as ScrollLink } from "react-scroll";
import { useAppSelector } from "../../hooks/typedHooks";

export const Header = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const user = useAppSelector((state) => state.user.userData);

  const dropdownOptions = [
    {
      link: "/men",
      label: "For Men",
    },
    {
      link: "/women",
      label: "For Women",
    },
  ];

  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.header_left}>
          <Link to="/">
            <Logo />
          </Link>
          <div className={styles.header_menuWrap}>
            <DropdownMenu title="Shop" options={dropdownOptions} />
            <a href="#">On Sale</a>
            <ScrollLink
              to="arrivals"
              smooth={true}
              duration={600}
              className={styles.link}
            >
              New Arrivals
            </ScrollLink>
          </div>
        </div>
        <div className={styles.header_right}>
          <Link to="/cart">
            <Cart />
          </Link>
          <Link to={isAuth ? "/profile" : "/login"}>
            {isAuth ? (
              <div className={styles.header_user}>
                <Profile /> <span>{user.username}</span>{" "}
              </div>
            ) : (
              <Profile />
            )}
          </Link>
        </div>
      </header>
    </div>
  );
};
