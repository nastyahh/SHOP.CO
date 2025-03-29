import "../../sharedStyles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { ReactComponent as Profile } from "../../assets/profile.svg";
import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";
import styles from "./Header.module.scss";
import { Link, useLocation, useNavigate } from "react-router";
import { useAppSelector } from "../../hooks/typedHooks";
import { useDebounce } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useGetCartQuery } from "@/redux/productsApi";
import { CartItemType } from "@/types";

export const Header = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const user = useAppSelector((state) => state.user.userData);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const { data } = useGetCartQuery(user.id);
  let cartCount = data?.cart_products?.reduce(
    (summ: number, product: CartItemType) => summ + product.quantity,
    0
  );

  const queryParams = new URLSearchParams(search);

  const dropdownOptions = [
    {
      link: "/catalog?gender=male",
      label: "For Men",
    },
    {
      link: "/catalog?gender=female",
      label: "For Women",
    },
  ];

  useEffect(() => {
    if (pathname !== "/catalog") return;

    queryParams.set("search", debouncedSearch);

    navigate(`/catalog?search=${queryParams.get("search")}`);
  }, [debouncedSearch]);

  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.header_left}>
          <Link to="/">
            <Logo />
          </Link>
          <div className={styles.header_menuWrap}>
            <DropdownMenu title="Catalog" options={dropdownOptions} />
          </div>
          {pathname === "/catalog" && (
            <div className={styles.header_searchContainer}>
              <input
                type="text"
                className={styles.header_search}
                placeholder="Search for products..."
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
              />
            </div>
          )}
        </div>
        <div className={styles.header_right}>
          <Link to={isAuth ? "/cart" : "/login"}>
            <div className={styles.header_cartWrap}>
              <Cart />
              {isAuth && data?.cart_products.length > 0 && (
                <span className={styles.cart_counter}>
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
          </Link>
          <Link to={`${isAuth ? "/profile" : "/login"}`}>
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
