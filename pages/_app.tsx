import '../styles/globals.css';
import type { AppProps } from 'next/app';

import ContextProvider from '../context/recipe-context';
import { Wrapper } from '../exports/exports';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ContextProvider>
  );
}

export default MyApp;
