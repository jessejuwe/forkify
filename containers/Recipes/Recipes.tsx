import React, { useContext } from 'react';
import Image from 'next/future/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaArrowLeft, FaArrowRight, FaSmile } from 'react-icons/fa';

import { RecipeContext } from '../../context/recipe-context';

type Props = {};

const Recipes: React.FC<Props> = props => {
  const ctx = useContext(RecipeContext);

  return (
    <>
      <AnimatePresence>
        <div className="app__recipe">
          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            exit={{ x: [0, 20], opacity: [1, 0] }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            className="search-results"
          >
            <ul className="results">
              {ctx?.search.results.map(result => (
                <li key={result.id} className="preview">
                  <a
                    className="preview__link preview__link--active"
                    href="#23456"
                  >
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
                      <div className="preview__user-generated">
                        <FaUser />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

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

            <p className="copyright">
              &copy; Copyright by
              <a
                className="twitter-link"
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/iktheenigma"
              >
                Jesse Juwe
              </a>
            </p>
          </motion.div>

          <motion.div
            whileInView={{ y: [-100, 0], opacity: [0, 1] }}
            exit={{ y: [0, 20], opacity: [1, 0] }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            className="recipe"
          >
            <div className="message">
              <div>
                <FaSmile />
              </div>
              <p>Start by searching for a recipe or an ingredient. Have fun!</p>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Recipes;
