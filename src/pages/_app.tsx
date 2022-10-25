import '../styles/globals.css';

import Head from 'next/head';

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="application-name" content="Slug App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Slug App" />
        <link rel="apple-touch-icon" href="/icons/192.png" />
        <meta
          name="description"
          content="Web application providing information for UCSC students"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://slug.napatsc.com" />
        <meta name="twitter:title" content="Slug App" />
        <meta
          name="twitter:description"
          content="Web application providing information for UCSC students"
        />
        <meta
          name="twitter:image"
          content="https://slug.napatsc.com/icons/192.png"
        />
        <meta name="twitter:creator" content="@napatsc" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Slug App" />
        <meta
          property="og:description"
          content="Web application providing information for UCSC students"
        />
        <meta property="og:site_name" content="Slug App" />
        <meta property="og:url" content="https://slug.napatsc.com" />
        <meta property="og:image" content="" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
