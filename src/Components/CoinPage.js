import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CoinInfo from './CoinInfo';
import { styled } from '@mui/material/styles';

const CoinPage = () => {
  const {currency, setCurrency} = CryptoState();
  const [coin,setCoin] = useState();
  const { id } = useParams();

  const fetchCoin = async() =>{
    const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    setCoin(data);
    console.log(data);
  }

  useEffect(()=>{
    fetchCoin()
  },[]);

  const Root = styled('div')(({ theme }) => ({
      display:'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems:'center',
        color:'red'
      },
    [theme.breakpoints.up('md')]: {
    },
    [theme.breakpoints.up('lg')]: {
    },
  }));

  return (
    <Root >
      {/* sidebar */}
      <div >
        Side bar
      </div>

       <CoinInfo/>

    </Root>
  )
}

export default CoinPage