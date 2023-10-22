import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  LinearProgress,
  Pagination,
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
import { useNavigate } from "react-router-dom";

const CoinsTable = () => {
  const { currency, symbol } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const TableHeader = ["Coins", "Price", "24h change", "Market cap"];
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
console.log(search);
  const getAll = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    setLoading(false);
    setCoins(data);
  };
  useEffect(() => {
    getAll();
  }, [currency]);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  const numberWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
              <TableHead sx={{ backgroundColor: "#eebc1d" }}>
                <TableRow>
                  {TableHeader.map((header, index) => (
                    <TableCell
                      sx={{
                        color: "#000",
                        fontWeight: 700,
                        fontFamily: "Montserrat",
                      }}
                      align={header === "Coins" ? "" : "right"}
                      key={index}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .splice(page* 10, 10)
                  .map((row, index) => {
                    const profit = row.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coin/${row.id}`)}
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                          backgroundColor: "#16171a",
                          "&:hover": {
                            backgroundColor: "#131111",
                            fontFamily: "Montserrat",
                          },
                        }}
                      >
                        <TableCell
                          style={{ display: "flex", gap: 15 }}
                          component="th"
                          scope="row"
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            color: 'gold'
          }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_,value)=>{
            setPage(value-1);
            window.scroll(0,450)
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
