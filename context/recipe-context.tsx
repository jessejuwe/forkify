import React, { useState, useEffect } from 'react';

import Recipe from '../model/Recipe';
import Query from '../model/Query';
import { API_URL, KEY, RES_PER_PAGE } from '../helpers/helpers';
import useSearchQuery from '../hooks/use-searchQuery';
import useUploadData from '../hooks/use-uploadData';

interface Search {
  query: string;
  results: Query[];
  page: number;
  resultsPerPage?: number;
}

interface RecipeContextObj {
  recipe: Recipe | undefined;
  search: Search;
  bookmarks: Recipe[];
  searchQuery: (query: string) => void;
  loadRecipe: (id: string) => void;
  uploadRecipe: (newRecipe: Recipe) => void;
  addBookmark: (recipe: Recipe) => void;
  deleteBookmark: (id: string) => void;
  persistBookmarks: () => void;
  getSearchResultsPage: (page: number) => void;
  updateServings: (newServings: number) => void;
  queryLoading: boolean;
  queryError: null | string;
  uploadLoading: boolean;
  uploadError: null | string;
}

const initialSearch = {
  query: '',
  results: [],
  page: 1,
  resultsPerPage: RES_PER_PAGE,
};

export const RecipeContext = React.createContext<RecipeContextObj>({
  recipe: undefined,
  search: initialSearch,
  bookmarks: [],
  searchQuery: (query: string) => {},
  loadRecipe: (id: string) => {},
  uploadRecipe: (newRecipe: Recipe) => {},
  addBookmark: (recipe: Recipe) => {},
  deleteBookmark: (id: string) => {},
  persistBookmarks: () => {},
  getSearchResultsPage: (page: number) => {},
  updateServings: (newServings: number) => {},
  queryLoading: false,
  queryError: null,
  uploadLoading: false,
  uploadError: null,
});

type Props = { children: React.ReactNode };

const ContextProvider: React.FC<Props> = props => {
  const [recipe, setRecipe] = useState<Recipe | undefined>(); // recipes from search query
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
    setSearch(initialSearch);

    const loadedResults: Query[] = [];

    const data = await fetchData(`${API_URL}?search=${query}&key=${KEY}`);

    // Guard Clause
    if (!data) throw new Error('Data fetching unsuccessful.');

    const recipe = data.data.recipes; // array of search queries

    // Data Transformation
    for (const key in recipe) {
      loadedResults.push({
        id: recipe[key].id,
        title: recipe[key].title,
        image: recipe[key].image_url,
        publisher: recipe[key].publisher,
      });
    }

    const results = recipe.map((rec: any) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }), // conditionally add properties to objects
      };
    });

    const page = 1;

    setSearch({ query, results, page });
  };

  // function for loading a recipe to view
  const loadRecipe = async (id: string) => {
    const data = await fetchData(`${API_URL}${id}?key=${KEY}`);

    // Guard Clause
    if (!data) throw new Error('Data fetching unsuccessful.');

    const recipe = data.data.recipe; // array of search queries

    // Data Transformation
    const loadedRecipe: Recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    setRecipe(loadedRecipe);

    bookmarks.some(bookmark => bookmark.id === id)
      ? setRecipe(prevState => {
          if (prevState) {
            return { ...prevState, bookmarked: true };
          }
        })
      : setRecipe(prevState => {
          if (prevState) {
            return { ...prevState, bookmarked: false };
          }
        });
  };

  // function for uploading data to the Recipe API
  const uploadRecipe = async (newRecipe: Recipe) => {
    console.log('uploading...');

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

      await sendRequest(requestConfig);
    } catch (err: any) {
      console.log(err.message || 'Something went wrong!');
    }
  };

  const updateServings = (newServings: number) => {
    // Update the servings in the state
    // setRecipe(prevState => {
    //   if (prevState) {
    //     return {
    //       ...prevState,
    //       servings:
    //         newServings > 0 ? prevState.servings + 1 : prevState.servings - 1,
    //       ingredients: [
    //         ...prevState.ingredients.map(ing => ({
    //           ...ing,
    //           quantity: (ing.quantity * newServings) / prevState.servings,
    //         })),
    //       ],
    //     };
    //   } else {
    //     return prevState;
    //   }
    // });

    recipe?.ingredients.forEach(ing => {
      ing.quantity = (ing.quantity * newServings) / recipe.servings;
    });

    // Update the servings in the state
    recipe?.servings ? newServings : recipe?.servings;
  };

  const addBookmark = (recipe: Recipe) => {};

  const deleteBookmark = (id: string) => {};

  const persistBookmarks = () => {};

  const getSearchResultsPage = (page: number) => {};

  const contextValue: RecipeContextObj = {
    recipe,
    bookmarks,
    search,
    searchQuery,
    loadRecipe,
    uploadRecipe,
    addBookmark,
    deleteBookmark,
    persistBookmarks,
    getSearchResultsPage,
    updateServings,
    queryLoading,
    queryError,
    uploadLoading,
    uploadError,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default ContextProvider;
