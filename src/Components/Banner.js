import { Container, Typography } from '@mui/material';
import React from 'react';
import Carousel from './Carousel';

    const banner = {
        backgroundImage: 'url(./banner.jpg)'
    }
    const bannerContent ={
        height:400,
        display:'flex',
        flexDirection:'column',
        paddingTop:25,
        justifyContent:'space-around'
    }
    const tagline = {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'40%',
        textAlign:'center'
    }

const Banner = () => {
  return (
    <div style={banner}>
        <Container style={bannerContent}>
            <div style={tagline}>
                <Typography
                    variant='h2'
                    style={{
                        fontWeight:'bold',
                        marginBottom:15,
                        fontFamily:"Montserrat"
                    }}
                >
                    CryptoCoins
                </Typography>
                <Typography
                    variant='subtitle2'
                    style={{
                        color:'darkgrey',
                        textTransform:'capitalize',
                        fontFamily:"Montserrat"
                    }}
                >
                    Get all the info regarding you favourite Crypto currency
                </Typography>
            </div>
            <Carousel/>
                    {/* <button onClick={handleCoin} style={{padding: '20px'}}>
                        click me
                    </button> */}
        </Container>
    </div>
  )
}

export default Banner;