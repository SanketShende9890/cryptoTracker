import React from 'react';
import { CryptoState } from '../CryptoContext';

const CoinPage = () => {
  const {currency, setCurrency} = CryptoState()

  return (
    <div>
      {currency}
    </div>
  )
}

export default CoinPage