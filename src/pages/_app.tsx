
import '../styles/global.css';

import { ChallengesProvider } from '../contexts/ChallengesContext'
import { useState } from 'react';
import { CountDownProvider } from '../contexts/CountDownContext';

function MyApp({ Component, pageProps }) {


  return (

    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>

  )
}

export default MyApp
