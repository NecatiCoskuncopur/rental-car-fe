import type { AppProps } from 'next/app';

import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { ScrollToTopButton } from '@/components';
import GlobalStyles from '@/GlobalStyles';
import { Footer, Header } from '@/layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    (page => (
      <>
        <GlobalStyles />
        <ToastContainer position="top-right" autoClose={3000} />
        <ScrollToTopButton />
        <Header />
        {page}
        <Footer />
      </>
    ));

  return getLayout(<Component {...pageProps} />);
}
