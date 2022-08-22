import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Box sx={{ boxShadow: 3 }}>
        <nav className="navContainer">
          <ul className="navList">
            <li>
              <Link to="/classRoom">Home</Link>
            </li>
            <li>All Classes</li>
            <li>Lesson Plans</li>
            <li>Meal Preferences</li>
          </ul>
        </nav>
      </Box>
    </>
  );
};

export default Navbar;
