import '../styles/globals.css';
import type { AppProps } from 'next/app';

import ContextProvider from '../context/recipe-context';
import { Wrapper } from '../exports/exports';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </Wrapper>
  );
}

export default MyApp;
