import React from 'react';
// import { AnimatePresence } from 'framer-motion';

import RecipeResult from './RecipeResult';
import RecipeView from './RecipeView';

type Props = {};

const Recipes: React.FC<Props> = props => {
  return (
    <div className=" app__recipe">
      <RecipeResult />
      <RecipeView />
    </div>
  );
};

export default Recipes;
