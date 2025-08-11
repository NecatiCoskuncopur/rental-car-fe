import type { AppProps } from 'next/app';

import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { ScrollToTopButton } from '@/components';
import GlobalStyles from '@/GlobalStyles';
import { Footer, Header } from '@/layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  minimalLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const DefaultLayout = (page: ReactElement) => (
  <>
    <GlobalStyles />
    <ToastContainer position="top-right" autoClose={3000} />
    <ScrollToTopButton />
    <Header />
    {page}
    <Footer />
  </>
);

const MinimalLayout = (page: ReactElement) => (
  <>
    <GlobalStyles />
    <ToastContainer position="top-right" autoClose={3000} />
    <ScrollToTopButton />
    {page}
  </>
);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.minimalLayout) {
    return MinimalLayout(<Component {...pageProps} />);
  }

  const getLayout = Component.getLayout ?? DefaultLayout;

  return getLayout(<Component {...pageProps} />);
}
