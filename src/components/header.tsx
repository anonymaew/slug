import Head from 'next/head';

const Header = (props: { title: string; description: string; url: string }) => {
  return (
    <Head>
      <meta name="application-name" content={props.title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={props.title} />
      <meta name="description" content={props.description} />
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
      <meta name="twitter:url" content={props.url} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta
        name="twitter:image"
        content="https://slug.napatsc.com/icons/192.png"
      />
      <meta name="twitter:creator" content="@napatsc" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content="Slug App" />
      <meta property="og:url" content={props.url} />
      <meta property="og:image" content="" />
    </Head>
  );
};
