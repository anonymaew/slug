import Head from 'next/head';
import { ReactNode } from 'react';

const MainLayout = (props: { children: ReactNode }) => {
  return (
    <div className="text-black bg-white dark:bg-zinc-900 dark:text-zinc-100">
      <div className="relative max-w-xl min-h-screen p-2 pb-24 mx-auto">
        <Head>
          <title>UCSC Dining Menu</title>
          <meta
            name="description"
            content="A better and faster solution for UCSC Dining Menu lookup"
          />
        </Head>
        <main className="relative text-sm sm:text-base">{props.children}</main>
        <footer className="absolute bottom-0 left-0 w-full p-4 text-sm text-center border-t -z-10 text-zinc-500 border-zinc-300 dark:border-zinc-700">
          <p>
            Available at{" "}
            <a
              className="underline cursor-pointer"
              href="https://github.com/anonymaew/ucsc-dining-menu"
            >
              GitHub
            </a>
          </p>
          <p>
            {`© ${new Date().getFullYear()} `}
            <a className="underline cursor-pointer" href="https://napatsc.com">
              Napat Srichan
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
