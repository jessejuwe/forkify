import React, { EventHandler, useCallback, useContext } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { RecipeContext } from '../../context/recipe-context';

type Props = {};

const Pagination = (props: Props) => {
  const ctx = useContext(RecipeContext);

  const curPage: number = ctx.search.page;
  //   prettier-ignore
  const numPages: number = Math.ceil(ctx.search.results.length / ctx.search.resultsPerPage);

  let pageView;

  //   if on first page, and there are no other pages
  if (curPage === 1 && numPages === 1) {
    pageView = '';
  }

  //   if on first page, and there are other pages
  if (curPage === 1 && numPages > 1) {
    pageView = (
      <button
        data-goto={curPage + 1}
        className="btn--inline pagination__btn--next"
      >
        <span>Page {curPage + 1}</span>
        <div className="search__icon">
          <FaArrowRight href="#icon-arrow-right" />
        </div>
      </button>
    );
  }

  // if on last page
  if (curPage === numPages && numPages > 1) {
    pageView = (
      <button
        data-goto={curPage - 1}
        className="btn--inline pagination__btn--prev"
      >
        <div className="search__icon">
          <FaArrowLeft href="#icon-arrow-left" />
        </div>
        <span>Page {curPage - 1}</span>
      </button>
    );
  }

  // Some other page
  if (curPage < numPages && curPage !== 1) {
    pageView = (
      <>
        <button
          data-goto={curPage - 1}
          className="btn--inline pagination__btn--prev"
        >
          <div className="search__icon">
            <FaArrowLeft href="#icon-arrow-left" />
          </div>
          <span>Page {curPage - 1}</span>
        </button>

        <button
          data-goto={curPage + 1}
          className="btn--inline pagination__btn--next"
        >
          <span>Page {curPage + 1}</span>
          <div className="search__icon">
            <FaArrowRight href="#icon-arrow-right" />
          </div>
        </button>
      </>
    );
  }
  
  const changePageHandler = useCallback(
    (event: any) => {
      event.preventDefault();

      // Figuring which button was clicked
      const btn = event.target.closest('.btn--inline');

      // Guard Clause
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      ctx.getSearchResultsPage(goToPage); // Render NEW results and pagination buttons
    },
    [ctx]
  );

  return (
    <div className="pagination" onClick={changePageHandler}>
      {pageView}
    </div>
  );
};

export default React.memo(Pagination);
