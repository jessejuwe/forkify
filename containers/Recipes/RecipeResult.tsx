import React, { useContext } from 'react';
import Image from 'next/future/image';
import { motion } from 'framer-motion';
import { FaUser, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { RecipeContext } from '../../context/recipe-context';
import Spinner from '../../components/Spinner/Spinner';

type Props = {};

const RecipeResult = (props: Props) => {
  const ctx = useContext(RecipeContext);

  return (
    <div className="search-results">
      {ctx.queryLoading && ctx.search.results.length == 0 && <Spinner />}
      {ctx.search.results.length > 0 && (
        <ul className="results">
          {ctx?.search.results.map(result => (
            <motion.li
              key={result.id}
              whileInView={{ x: [-100, 0], opacity: [0, 1] }}
              exit={{ x: [0, 20], opacity: [1, 0] }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                delayChildren: 0.5,
              }}
              className="preview"
              onClick={() => ctx.loadRecipe(result.id)}
            >
              <a className="preview__link preview__link--active" href="#23456">
                <figure className="preview__fig">
                  <Image
                    src={result.image}
                    alt={result.title}
                    width={112.59}
                    height={36.8}
                  />
                </figure>
                <div className="preview__data">
                  <h4 className="preview__title">{result.title}</h4>
                  <p className="preview__publisher">{result.publisher}</p>
                  {ctx.recipe?.bookmarked && (
                    <div className="preview__user-generated">
                      <FaUser />
                    </div>
                  )}
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      )}

      {ctx?.search?.results.length > 0 && (
        <div className="pagination">
          <button className="btn--inline pagination__btn--prev">
            <div className="search__icon flex items-center">
              <FaArrowLeft />
              <span>Page 1</span>
            </div>
          </button>
          <button className="btn--inline pagination__btn--next">
            <div className="search__icon flex items-center">
              <span>Page 3</span>
              <FaArrowRight />
            </div>
          </button>
        </div>
      )}

      {/* <p className="copyright">
    &copy; Copyright by
    <a
      className="twitter-link"
      target="_blank"
      rel="noreferrer"
      href="https://twitter.com/iktheenigma"
    >
      Jesse Juwe
    </a>
  </p> */}
    </div>
  );
};

export default RecipeResult;
