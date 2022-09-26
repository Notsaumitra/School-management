import { Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Meals = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="h5" color="primary">
        Lunch Time Meals Available
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={10} mt={1}>
        <Stack justifyContent="center" alignItems="center">
          <img src="/images/1meal200x200px.jpg" alt="veg-meal" />
          <Typography variant="subtitle1">Healthy Veg Meal</Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <img src="/images/2meal200x200px.jpg" alt="fruits" />
          <Typography variant="subtitle1">Fresh Fruits</Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <img src="/images/3meal200x200px.jpg" alt="pizza" />
          <Typography variant="subtitle1">Pizza</Typography>
        </Stack>
      </Stack>
      <Outlet />
    </Stack>
  );
};

export default Meals;
