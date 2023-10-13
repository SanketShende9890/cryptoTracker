import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const CoinsTable = () => {
  const { currency, symbol } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const TableHeader = ["Coins", "Price", "24h change", "Market cap"];
  const [search, setSearch] = useState();
  console.log(search);
  const getAll = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setLoading(false);
    setCoins(data);
    console.log(data);
  };
  useEffect(() => {
    getAll();
  }, [currency]);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  function createData(coins, price, hr24change, marketcap) {
    return { coins, price, hr24change, marketcap };
  }
  
  const rows = coins.map((data,index)=>
    createData(data.name, data.current_price, data.price_change_24h, data.market_cap)
  )
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24),

  //   createData('Ice cream sandwich', 237, 9.0, 37),
  //   createData('Eclair', 262, 16.0, 24),
  //   createData('Cupcake', 305, 3.7, 67),
  //   createData('Gingerbread', 356, 16.0, 49),
  // ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Price by Market Cap
        </Typography>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          id="outlined-basic"
          label="Search for a Crypto currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{backgroundColor: '#eebc1d'}}>
                <TableRow>
                  {TableHeader.map((header, index) => (
                    <TableCell sx={{color: '#000', fontWeight: 700, fontFamily: 'Montserrat'}} align={header==="Coins"?"":"right"} key={index}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.map((row) => (
            <TableRow
              key={row.coins}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.coins}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.hr24change}</TableCell>
              <TableCell align="right">{row.marketcap}</TableCell>
            </TableRow>
          ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
