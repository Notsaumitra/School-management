/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { StyledBadge } from "./sharedStyles";

const EmotionButton = styled.div`
  [button]: {
    color: red;
  }
`;

const Navbar = () => {
  // const classes = useStyles();
  return (
    <div
      css={css`
        padding: 0;
        background-color: #d9e3f0;
      `}
    >
      <nav>
        <ul className="navList">
          <li>
            <NavLink to="/">
              <Typography variant="body1">Home</Typography>
            </NavLink>
          </li>
          <li>
            <NavLink to="/classRoom">
              <Typography>All Classes</Typography>
            </NavLink>
          </li>
          <li>
            <NavLink to="/lessonPlan">
              <Typography>Lesson Plan</Typography>
            </NavLink>
          </li>
          <li>
            <NavLink to="/listAllMeals">
              <Typography>Meal Preferences</Typography>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
