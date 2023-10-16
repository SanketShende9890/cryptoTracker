import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { Container, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CryptoState } from "../CryptoContext";
// import CryptoContext from '../CryptoContext';

const Header = () => {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar sx={{ padding: "10px 0" }} color="transparent" position="static">
        <CssBaseline />
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => {
                navigate("/");
              }}
              className="logo"
            >
              CryptoCoins
            </Typography>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currency}
                  label="Currency"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
