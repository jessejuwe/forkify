import React, { useContext } from 'react';

import { RecipeContext } from '../../context/recipe-context';
import RecipeResult from './RecipeResult';
import RecipeView from './RecipeView';
import Modal from '../../components/Modal/Modal';

type Props = {};

const Recipes: React.FC<Props> = props => {
  const ctx = useContext(RecipeContext);

  return (
    <div className=" app__recipe">
      {ctx.modalError && (
        <Modal
          onConfirm={() => ctx.closeModal()}
          title={ctx.modalError.title}
          message={ctx.modalError.message}
        />
      )}

      <RecipeResult />
      <RecipeView />
    </div>
  );
};

export default Recipes;
