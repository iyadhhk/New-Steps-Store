import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";

import { logout } from "../../features/auth/auth.service";
import { selectUser } from "../../features/auth/auth.slice";

import MobileMenu from "./mobile-menu.component";
import NavLink from "../../components/nav-link/nav-link.component";
import { ReactComponent as NewStepsLogo } from "../../assets/logo.svg";
import { ReactComponent as Bag } from "../../assets/bag.svg";
import { ReactComponent as Favorites } from "../../assets/heart.svg";

const Navigation = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectUser);

  const dropdownHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const signOutCallback = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="sticky top-0 bg-gray-100 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex justify-between items-center w-full">
              <Link to="/" className="flex-shrink-0">
                <NewStepsLogo className="stroke-primary stroke-[10px] fill-transparent h-8 w-auto" />
                <span className="font-bold text-primary">New</span>
                <span className="text-secondary font-bold">Steps</span>
              </Link>
              <div className="flex items-center mr-4 md:mr-0">
                <div className="hidden  md:flex ml-10 justify-end items-center space-x-4">
                  <NavLink route={"/shop/men"} title="Men" />
                  <NavLink route={"/shop/women"} title="Women" />
                  <NavLink route={"/shop/kids"} title="Kids" />
                  {user ? (
                    <span
                      className="font-semibold text-md text-secondary px-3 py-2 cursor-pointer"
                      onClick={signOutCallback}>
                      Sign out
                    </span>
                  ) : (
                    <NavLink route={"/auth"} title="SignIn" />
                  )}

                  <Link to="/wishlist" className="flex-shrink-0">
                    <Favorites className="fill-primary h-6 w-auto" />
                  </Link>
                </div>

                <Link to="/cart" className="relative flex-shrink-0 ml-4">
                  <Bag className="fill-primary h-6 w-auto" />
                  <span className="absolute top-[-10px] right-[-15px] p-1 inline-block text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                    0
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex md:hidden -mr-2 ml-3">
              <button
                onClick={dropdownHandler}
                type="button"
                className="inline-flex items-center justify-center p-2 text-primary  focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false">
                {!isMenuOpen ? (
                  <svg
                    className="block h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <MobileMenu
            user={user}
            signOut={signOutCallback}
            menuHandler={dropdownHandler}
          />
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
