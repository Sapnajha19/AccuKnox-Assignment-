import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ searchQuery, onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-[40px]">
      <div className="flex flex-row gap-2 ml-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-semibold ${isActive ? "text-[#1d5693]" : "text-[#8a8686]"}`
          }
        >
          Home
        </NavLink>
        <p className="text-[#8a8686] font-semibold">&gt;</p>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `font-semibold ${isActive ? "text-[#1d5693]" : "text-[#8a8686]"}`
          }
        >
          Dashboard v2
        </NavLink>
      </div>
      <div className="mr-5 relative ">
        <Icon
          name="search"
          className="absolute left-1.5 top-0.5 text-[#8db0ca]"
        />
        <input
          placeholder="Search anything..."
          className="border border-[#b5ceea] bg-[#ebf1f7] text-sm rounded-md p-0.5 pl-8 w-[300px]"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Navbar;
