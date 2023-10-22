import React from 'react';
// import { styled } from '@mui/system';
import { styled } from '@mui/material/styles';

const CoinInfo = () => {

    const Styles = styled('div')({
        backgroundColor: 'red',
        width: '100%',
        margin: '10px 20px',

    });

    const Root = styled('div')(({ theme }) => ({
        display:'flex',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          alignItems:'center'
        },
      // padding: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        // backgroundColor: blue[500],
      },
      [theme.breakpoints.up('lg')]: {
        // backgroundColor: green[500],
      },
    }));
    
  return (
    <Root>
      Coins Info 
    </Root>
  )
}

export default CoinInfo