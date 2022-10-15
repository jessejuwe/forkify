import type { NextPage } from 'next';
import Head from 'next/head';

import { Recipes } from '../exports/exports';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Forkify</title>
        <meta
          name="Forkify: Recipe App"
          content="Find a recipe from over 1,000,000 recipes"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="">
        <Recipes />
      </main>
    </div>
  );
};

export default Home;
