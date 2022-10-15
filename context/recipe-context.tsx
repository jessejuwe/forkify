import React, { useState, useEffect } from 'react';

import Recipe from '../model/Recipe';
import { API_URL, KEY, RES_PER_PAGE } from '../helpers/helpers';
import useSearchQuery from '../hooks/use-searchQuery';
import useUploadData from '../hooks/use-uploadData';

interface Search {
  query: string;
  results: Recipe[];
  page: number;
  resultsPerPage?: number;
}

interface RecipeContextObj {
  recipes: Recipe[];
  search: Search;
  bookmarks: Recipe[];
  searchQuery: (query: string) => void;
  uploadRecipe: (newRecipe: Recipe) => void;
}

const initialSearch = {
  query: '',
  results: [],
  page: 1,
  resultsPerPage: RES_PER_PAGE,
};

export const RecipeContext = React.createContext<RecipeContextObj | null>({
  recipes: [],
  search: initialSearch,
  bookmarks: [],
  searchQuery: (query: string) => {},
  uploadRecipe: (newRecipe: Recipe) => {},
});

type Props = { children: React.ReactNode };

const ContextProvider: React.FC<Props> = props => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]); // recipes from search query
  const [bookmarks, setBookmarks] = useState<Array<Recipe>>([]); // saved recipes
  const [search, setSearch] = useState<Search>(initialSearch); // search data

  // prettier-ignore
  // destructuring custom Hook
  const { isLoading: queryLoading, error: queryError, fetchData } = useSearchQuery();

  // prettier-ignore
  // destructuring custom Hook
  const { isLoading: uploadLoading, error: uploadError, sendRequest } = useUploadData();

  // function for querying the Recipe API
  const searchQuery = async (query: string) => {
    console.log('querying');

    const loadedRecipes: Recipe[] = [];

    const data = await fetchData(`${API_URL}?search=${query}&key=${KEY}`);

    console.log(data);

    // Data transformation
    for (const taskKey in data) {
      loadedRecipes.push({
        id: taskKey,
        title: data[taskKey].title,
        publisher: data[taskKey].publisher,
        sourceUrl: data[taskKey].sourceUrl,
        image: data[taskKey].image,
        servings: data[taskKey].servings,
        cookingTime: data[taskKey].cookingTime,
        ingredients: data[taskKey].ingredients,
        key: data[taskKey].key,
      });
    }

    const results = data.map((rec: any) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }), // conditionally add properties to objects
      };
    });

    const page = 1;

    setRecipes(loadedRecipes);
    setSearch({ query, results, page });

    console.log(loadedRecipes);
  };

  // function for uploading data to the Recipe API
  const uploadRecipe = async (newRecipe: Recipe) => {
    try {
      const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
          const ingArr = ing[1].split(',').map((el: string) => el.trim());
          // const ingArr = ing[1].replaceAll(' ', '').split(',');

          if (ingArr.length !== 3) throw new Error('Wrong Ingredient Format!');

          const [quantity, unit, description] = ingArr;
          return { quantity: quantity ? +quantity : null, unit, description };
        });

      const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
      };

      const requestConfig = {
        url: `${API_URL}?key=${KEY}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      };

      const data = await sendRequest(requestConfig);
    } catch (err: any) {
      console.log(err.message || 'Something went wrong!');
    }
  };

  const contextValue: RecipeContextObj = {
    recipes,
    bookmarks,
    search,
    searchQuery,
    uploadRecipe,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default ContextProvider;
