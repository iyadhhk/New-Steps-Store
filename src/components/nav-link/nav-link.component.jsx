import { Link } from "react-router-dom";

const NavLink = ({ route, title, ...otherProps }) => (
  <Link
    to={route}
    className="font-semibold text-md text-primary px-3 py-2"
    {...otherProps}>
    {title}
  </Link>
);

export default NavLink;
