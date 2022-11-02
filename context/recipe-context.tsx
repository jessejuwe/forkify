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

interface Ingredients {
  quantity: number | null;
  unit: string;
  description: string;
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

  useEffect(() => {
    const storage = localStorage.getItem('bookmarks');

    // Guard clause
    if (!storage) return;

    const bookmarkData: Recipe[] = JSON.parse(storage);

    setBookmarks(bookmarkData);

    return () => {};
  }, []);

  // function for querying the Recipe API
  const searchQuery = async (query: string) => {
    setSearch(initialSearch);
    setRecipe(undefined);

    try {
      const data = await fetchData(`${API_URL}?search=${query}&key=${KEY}`);

      // Guard Clause
      if (!data) throw new Error('no recipe found 💥');

      const recipeData = data.data.recipes; // array of search queries

      const results = recipeData.map((rec: any) => {
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
        title: '🚫 Something went wrong',
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

      const recipeData = data.data.recipe; // array of search queries

      // Data Transformation
      const loadedRecipe: Recipe = {
        id: recipeData.id,
        title: recipeData.title,
        image: recipeData.image_url,
        publisher: recipeData.publisher,
        sourceUrl: recipeData.source_url,
        servings: recipeData.servings,
        cookingTime: recipeData.cooking_time,
        ingredients: recipeData.ingredients,
        bookmarked: false,
        ...(recipeData.key && { key: recipeData.key }), // conditionally add properties to objects
      };

      setRecipe(loadedRecipe);

      // checking if Recipe is in bookmarks
      const bookmarked = bookmarks.some(bookmark => bookmark.id === id);

      bookmarked
        ? setRecipe(
            prevState => prevState && { ...prevState, bookmarked: true }
          )
        : setRecipe(
            prevState => prevState && { ...prevState, bookmarked: false }
          );
    } catch (error: any) {
      setRecipe(undefined);
      setModalError({
        title: '🚫 Something went wrong',
        message: error.message,
      });
    }
  };

  // function for uploading data to the Recipe API
  const uploadRecipe = async (newRecipe: Recipe) => {
    const ingredients: Ingredients[] = [];

    newRecipe &&
      Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map((ing: [string, string[]]) => {
          const ingArr = ing[1].map(ing => ing.replaceAll(' ', '').split(','));

          // Checking if some ingredients do not match format
          const ing_format = ingArr.some(ing => ing.length !== 3);

          if (ing_format) throw new Error('Wrong Ingredient Format 💥');

          ingArr.forEach(ingredient => {
            const [qty, unit, description] = ingredient;

            const data = { quantity: qty ? +qty : null, unit, description };

            ingredients.push(data);
          });
        });

    const uploadRecipe = newRecipe && {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    try {
      const requestConfig = {
        url: `${API_URL}?key=${KEY}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: uploadRecipe && uploadRecipe,
      };

      const response = await sendRequest(requestConfig);

      // Guard clause
      if (!response.ok) throw new Error('unable to upload recipe 💥');

      setModalError({
        title: '✅ Upload Successful',
        message: 'Recipe Uploaded Successfully',
      });
    } catch (error: any) {
      setModalError({
        title: '🚫 Something went wrong',
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

  const addBookmark = (recipeInfo: Recipe) => {
    // Mark current recipe as bookmarked
    recipeInfo.bookmarked = true;
    if (recipeInfo.id === recipe?.id) setRecipe(recipeInfo);

    // prettier-ignore
    // Check if Recipe is already in bookmarks
    const bookmarked = bookmarks.some(bookmark => bookmark.id === recipeInfo.id);

    // Guard clause
    if (bookmarked) {
      // prettier-ignore
      setModalError({title: 'Bookmark', message: 'Recipe already bookmarked'});
      return;
    }

    const newBookmark: Recipe[] = [...bookmarks, recipeInfo];

    // if recipe is not bookmarked
    setBookmarks(newBookmark);
    // !bookmarked && bookmarks.push(recipeInfo);

    // console.log('Recipe added to bookmarks');

    persistBookmarks(newBookmark);
  };

  const deleteBookmark = (id: string) => {
    // Unmark current recipe as bookmarked
    if (id === recipe?.id)
      setRecipe(prevState => prevState && { ...prevState, bookmarked: false });

    // Find index of recipe to be removed
    // const index = bookmarks.findIndex(el => el.id === id);
    // const removedBookmark: Recipe[] = [...bookmarks].splice(index, 1);

    // Return an array of elements that do not match the id
    const newBookmark = bookmarks.filter(item => item.id !== id);

    setBookmarks(newBookmark);

    bookmarks.length === 0 ? removeBookmarks() : persistBookmarks(newBookmark);

    // console.log('Recipe removed from bookmarks');
  };

  const removeBookmarks = () => {
    localStorage.removeItem('bookmarks');
  };

  const persistBookmarks = (data: Recipe[]) => {
    localStorage.setItem('bookmarks', JSON.stringify(data));
  };

  const getSearchResultsPage = (page: number = search.page) => {
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
  };

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
