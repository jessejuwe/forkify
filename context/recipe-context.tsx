import React, { useState, useEffect, useCallback } from 'react';

import Recipe from '../model/Recipe';
import Query from '../model/Query';
import { API_URL, KEY, RES_PER_PAGE } from '../helpers/helpers';
import useSearchQuery from '../hooks/use-searchQuery';
import useUploadData from '../hooks/use-uploadData';

type Props = { children: React.ReactNode };

interface Error {
  title: string;
  message: string;
}

interface Search {
  query: string;
  results: Query[];
  currentResult: Query[];
  page: number;
  resultsPerPage: number;
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
  closeModal: () => void;
  reloadApp: () => void;
  queryLoading: boolean;
  uploadLoading: boolean;
  queryError: null | string;
  uploadError: null | string;
  modalError: null | Error;
}

const initialSearch = {
  query: '',
  results: [],
  currentResult: [],
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
  closeModal: () => {},
  reloadApp: () => {},
  queryLoading: false,
  uploadLoading: false,
  queryError: null,
  uploadError: null,
  modalError: null,
});

const ContextProvider: React.FC<Props> = props => {
  const [recipe, setRecipe] = useState<Recipe | undefined>(); // recipes from search query
  const [bookmarks, setBookmarks] = useState<Array<Recipe>>([]); // saved recipes
  const [search, setSearch] = useState<Search>(initialSearch); // search data
  const [modalError, setModalError] = useState<Error | null>(null);

  // prettier-ignore
  // destructuring custom Hook
  const { isLoading: queryLoading, error: queryError, fetchData } = useSearchQuery();

  // prettier-ignore
  // destructuring custom Hook
  const { isLoading: uploadLoading, error: uploadError, sendRequest } = useUploadData();

  // function for querying the Recipe API
  const searchQuery = async (query: string) => {
    setSearch(initialSearch);
    setRecipe(undefined);

    try {
      const data = await fetchData(`${API_URL}?search=${query}&key=${KEY}`);

      // Guard Clause
      if (!data) throw new Error('no recipe found 💥');

      const recipe = data.data.recipes; // array of search queries

      const results = recipe.map((rec: any) => {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
          ...(rec.key && { key: rec.key }), // conditionally add properties to objects
        };
      });

      const currentResult = results;

      const page = 1;
      const resultsPerPage = RES_PER_PAGE;

      setSearch({ query, results, currentResult, page, resultsPerPage });
      getSearchResultsPage();
    } catch (error: any) {
      setModalError({
        title: 'Something went wrong',
        message: error.message,
      });
    }
  };

  // function for loading a recipe to view
  const loadRecipe = async (id: string) => {
    try {
      const data = await fetchData(`${API_URL}${id}?key=${KEY}`);

      // Guard Clause
      if (!data) throw new Error('unable to preview recipe 💥');

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
        ...(recipe.key && { key: recipe.key }), // conditionally add properties to objects
      };

      setRecipe(loadedRecipe);

      // prettier-ignore
      bookmarks.some(bookmark => bookmark.id === id)
      ? setRecipe(prevState => prevState && { ...prevState, bookmarked: true })
      : setRecipe(prevState => prevState && { ...prevState, bookmarked: false });
    } catch (error: any) {
      setRecipe(undefined);
      setModalError({
        title: 'Something went wrong',
        message: error.message,
      });
    }
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

          if (ingArr.length !== 3)
            throw new Error('Wrong Ingredient Format 💥');

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
    } catch (error: any) {
      setModalError({
        title: 'Something went wrong',
        message: error.message,
      });
    }
  };

  // publisher-subscriber pattern (Subscriber)
  const updateServings = (newServings: number) => {
    // Update the servings in the state (inspired by sensei Etinosa)
    setRecipe(
      prevState =>
        prevState && {
          ...prevState,
          ingredients: [
            ...prevState.ingredients.map(ing => ({
              ...ing,
              quantity: (ing.quantity * newServings) / prevState.servings,
            })),
          ],
          servings: prevState.servings ? newServings : prevState.servings,
        }
    );
  };

  const addBookmark = (recipe: Recipe) => {};

  const deleteBookmark = (id: string) => {};

  const persistBookmarks = () => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  const getSearchResultsPage = useCallback(
    (page: number = search.page) => {
      const start = page > 1 ? (page - 1) * search.resultsPerPage : page;
      const end = page * search.resultsPerPage;

      setSearch(
        prevState =>
          prevState && {
            ...prevState,
            page,
            currentResult: prevState.results.slice(start, end),
          }
      );
    },
    [search.page, search.resultsPerPage]
  );

  const closeModal = () => setModalError(null);

  const reloadApp = () => {
    setSearch(initialSearch);
    setRecipe(undefined);
  };

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
    closeModal,
    reloadApp,
    queryLoading,
    uploadLoading,
    queryError,
    uploadError,
    modalError,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default ContextProvider;
