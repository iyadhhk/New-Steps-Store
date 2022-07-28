import { Link } from "react-router-dom";

import NavLink from "../../components/nav-link/nav-link.component";
import { ReactComponent as Favorites } from "../../assets/heart.svg";

const MobileMenu = ({ menuHandler, user, signOut, countWishlist }) => {
  return (
    <div className="md:hidden" id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border border-white border-t-2  flex flex-col items-center">
        <NavLink to="/shop/men" title="Men" onClick={menuHandler} />
        <NavLink to="/shop/women" title="Women" onClick={menuHandler} />
        <NavLink to="/shop/Kids" title="Kids" onClick={menuHandler} />
        {user ? (
          <NavLink
            className="text-secondary font-semibold text-md px-3 py-2"
            to="/"
            title="Sign out"
            onClick={() => {
              signOut();
              menuHandler();
            }}
          />
        ) : (
          <NavLink to="/auth" title="SignIn" onClick={menuHandler} />
        )}

        <Link
          to="/wishlist"
          onClick={menuHandler}
          className="relative flex-shrink-0 px-3 py-2 mt-1">
          <Favorites className="fill-secondary h-6 w-auto" />
          {countWishlist > 0 && (
            <div className="flex items-center justify-center absolute top-[0px] left-[0px] bg-blue-100 rounded-full w-5 h-5">
              <span className="text-xs font-semibold text-blue-800">{countWishlist}</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
