import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Wrapper } from '../exports/exports';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default MyApp;
