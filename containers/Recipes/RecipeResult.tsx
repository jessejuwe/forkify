import React, { useCallback, useContext } from 'react';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

import { RecipeContext } from '../../context/recipe-context';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination/Pagination';

type Props = {};

const RecipeResult = (props: Props) => {
  const ctx = useContext(RecipeContext);

  const router = useRouter(); // programmatic navigation

  const id = router.pathname;

  const loadHandler = (id: string) => {
    ctx.loadRecipe(id);

    console.log(id);
  };

  return (
    <div className="search-results">
      {ctx.queryLoading && ctx.search.results.length == 0 && <Spinner />}

      {ctx.search.results.length > 0 && (
        <ul className="results">
          {ctx?.search.currentResult.map(result => (
            <motion.li
              key={result.id}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ x: [-100, 0], opacity: [0, 1] }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                delayChildren: 0.5,
              }}
              className="preview"
              onClick={() => loadHandler(result.id)}
            >
              <a
                className={`preview__link ${
                  result.id === id ? 'preview__link--active' : ''
                } `}
                href={`#${result.id}`}
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
                  {ctx.recipe?.bookmarked && (
                    <div
                      className={`preview__user-generated ${
                        result.key ? '' : 'hidden'
                      }`}
                    >
                      <FaUser />
                    </div>
                  )}
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      )}

      {ctx?.search?.results.length > 0 && <Pagination />}
    </div>
  );
};

export default RecipeResult;
