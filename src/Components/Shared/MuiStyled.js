// import { makeStyles } from "@mui/styled-engine";
import { Stack, Button } from "@mui/material";
import { styled } from "@mui/system";

const useStyles = styled({
  stackRoot: {
    border: "1px solid gray",

    "& button:hover": {
      color: "red",
    },
  },
});

const MuiStyled = () => {
  const classes = useStyles();
  return (
    <Stack direction="column" spacing={2} className={classes.stackRoot}>
      <Button>Hover 1</Button>
      <Button>Hover 2</Button>
    </Stack>
  );
};

export default MuiStyled;
