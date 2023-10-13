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
const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const fetchTrendingCoin = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  const numberWithCommas = (price) =>{
    return(
      price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
    )
  }
  // useEffect(() => {
  //   fetchTrendingCoin();
  // }, [currency]);

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
          <span style={{color: profit ? "rgb(14,203,129)" : "red", fontWeight: 500 }}>
            {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)} %
          </span>
        </span>
        <span style={{fontSize:22,fontWeight:600,marginTop:5}}>
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
      <AliceCarousel
        items={slate}
        autoPlay
        mouseTracking
        // autoPlayInterval={1000}
        animationDuration={1500}
        infinite
        disableButtonsControls={true}
        disableDotsControls
        responsive={breakpoints}
      />
    </div>
  );
};

export default Carousel;
