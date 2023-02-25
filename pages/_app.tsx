import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GlobalProvider } from '../contexts/GlobalContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TCASFINDER</title>
      </Head>
      <GlobalProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </GlobalProvider>
    </>
  );
}

export default MyApp;
