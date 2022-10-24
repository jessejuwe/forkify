import React, { useContext } from 'react';

import { RecipeContext } from '../../context/recipe-context';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';
import RecipeList from './RecipeList';

type Props = {};

const RecipeResult = (props: Props) => {
  const ctx = useContext(RecipeContext);

  return (
    <div className="search-results">
      {ctx.queryLoading && ctx.search.results.length == 0 && <Spinner />}

      {ctx.search.results.length > 0 && (
        <ul className="results">
          {ctx?.search.currentResult.map(result => (
            <RecipeList
              key={result.id}
              id={result.id}
              onClick={() => ctx.loadRecipe(result.id)}
              image={result.image}
              title={result.title}
              publisher={result.publisher}
              recipeKey={result.key}
            />
          ))}
        </ul>
      )}

      {ctx?.search?.results.length > 0 && <Pagination />}
    </div>
  );
};

export default RecipeResult;
