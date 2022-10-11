import type { NextPage } from 'next';
import Head from 'next/head';

import { Bookmark } from '../../exports/exports';

const Bookmarks: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Forkify//Bookmarks</title>
        <meta name="Forkify//Bookmarks" content="Bookmarked Recipes" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="container">
        <Bookmark />
      </main>
    </div>
  );
};

export default Bookmarks;
