import type { NextPage } from 'next';
import Head from 'next/head';

import { AddRecipe } from '../../exports/exports';

const NewRecipe: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Forkify//Add a Recipe</title>
        <meta
          name="Forkify//Add a Recipe"
          content="Add a recipe to the millions of recipes available"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="container">
        <AddRecipe />
      </main>
    </div>
  );
};

export default NewRecipe;
