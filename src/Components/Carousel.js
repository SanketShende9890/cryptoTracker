import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const carousel = {
  height: "50%",
  display: "flex",
  alignItems: "center",
};
const carouselItems = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: 'pointer',
  color: '#fff',
  textTransform: 'uppercase'
};
const errorStyle = {
  color: 'red',
  fontWeight: 'bold',
};

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);
  const { currency, symbol } = CryptoState();
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1 second

  const fetchTrendingCoin = async () => {
    let retries = 0;
  
    while (retries < MAX_RETRIES) {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
        setTrending(data);
        setError(null); // Reset error if successful
        break; // Success, exit the loop
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log('Rate limited. Retrying in ' + (RETRY_DELAY / 1000) + ' seconds...'); // Log statement
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          retries++;
          if (retries === MAX_RETRIES) {
            setError("Max retries reached. Unable to fetch data.");
          }
        } else {
          console.error('An error occurred:', error);
          setError("An error occurred while fetching data.");
          break; // Don't retry for other errors
        }
      }
    }
  };

  useEffect(() => {
    // fetchTrendingCoin();
  }, [currency]);

  const numberWithCommas = (price) => {
    return (
      price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  };

  const slate = trending.map((coin, index) => {
    const profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link style={carouselItems} to={`/coins/${coin.id}`} key={index}>
        <img
          height="80"
          style={{ marginBottom: 10 }}
          src={coin.image}
          alt={coin.name}
        />
        <span>
          {coin.symbol}
          &nbsp;
          <span style={{ color: profit ? "rgb(14,203,129)" : "red", fontWeight: 500 }}>
            {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)} %
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 600, marginTop: 5 }}>
          {symbol}&nbsp;
          {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const breakpoints = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div style={carousel}>
      {error ? (
        <p style={errorStyle}>{error}</p>
      ) : (
        <AliceCarousel
          items={slate}
          autoPlay
          mouseTracking
          animationDuration={1500}
          infinite
          disableButtonsControls={true}
          disableDotsControls
          responsive={breakpoints}
        />
      )}
    </div>
  );
};

export default Carousel;
