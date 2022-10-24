import React, { useCallback, useContext } from 'react';
import Fraction from 'fraction.js';
import Image from 'next/future/image';
import { motion } from 'framer-motion';
import {
  FaSmile,
  FaClock,
  FaUsers,
  FaUser,
  FaMinusCircle,
  FaPlusCircle,
  FaBookmark,
  FaCheck,
  FaArrowRight,
} from 'react-icons/fa';

import { RecipeContext } from '../../context/recipe-context';
import Recipe from '../../model/Recipe';
import Spinner from '../../components/Spinner/Spinner';

type Props = {};

const RecipeFormat = (props: Props) => {
  const ctx = useContext(RecipeContext);

  const updateHandler = useCallback(
    (event: React.ChangeEvent<any>) => {
      event.preventDefault();

      const btn = event.target.closest('.btn--update-servings');

      // Guard Clause
      if (!btn) return;

      const { updateTo } = btn.dataset;

      if (+updateTo > 0) ctx.updateServings(+updateTo);
    },
    [ctx]
  );

  const bookmarkHandler = useCallback(
    (event: React.ChangeEvent<any>) => {
      event.preventDefault();

      const btn = event.target.closest('.btn--bookmark');

      // Guard Clause
      if (!btn) return;

      // short-circuiting
      ctx.recipe?.bookmarked
        ? ctx.deleteBookmark(ctx.recipe.id)
        : ctx.addBookmark(ctx.recipe as Recipe);
    },
    [ctx]
  );

  return (
    <div className="recipe">
      {!ctx.recipe && ctx.search.results.length == 0 && !ctx.queryLoading && (
        <div className="message">
          <div>
            <FaSmile />
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      )}

      {ctx.queryLoading && ctx.search.results.length > 0 && (
        <div className="">
          <Spinner />
        </div>
      )}

      {ctx.recipe && !ctx.queryLoading && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ x: [100, 0], opacity: [0, 1] }}
          transition={{
            type: 'tween',
            duration: 1,
            ease: 'easeInOut',
            delayChildren: 0.5,
          }}
        >
          <figure className="recipe__fig">
            <Image
              src={ctx.recipe.image}
              alt={ctx.recipe.title}
              className="recipe__img"
              width={112.59}
              height={36.8}
            />

            <h1 className="recipe__title">
              <span>{ctx.recipe.title}</span>
            </h1>
          </figure>

          <div className="app__flex app__align">
            <div className="recipe__details">
              <div className="recipe__info">
                <div className="recipe__info-icon">
                  <FaClock href={`#icon-clock`} />
                </div>
                <span className="recipe__info-data recipe__info-data--minutes">
                  {ctx.recipe.cookingTime}
                </span>
                <span className="recipe__info-text">minutes</span>
              </div>
            </div>

            <div className="recipe__info">
              <div className="recipe__info-icon">
                <FaUsers href={`#icon-users`} />
              </div>
              <span className="recipe__info-data recipe__info-data--people">
                {ctx.recipe.servings}
              </span>
              <span className="recipe__info-text">
                {ctx.recipe.servings === 1 ? 'serving' : 'servings'}
              </span>

              <div className="recipe__info-buttons" onClick={updateHandler}>
                <button
                  className="btn--tiny btn--update-servings"
                  data-update-to={ctx.recipe.servings - 1}
                >
                  <FaMinusCircle href={`#icon-minus-circle`} />
                </button>
                <button
                  className="btn--tiny btn--update-servings"
                  data-update-to={ctx.recipe.servings + 1}
                >
                  <FaPlusCircle href={`#icon-plus-circle`} />
                </button>
              </div>
            </div>

            {/* prettier-ignore */}
            <div className={`recipe__user-generated ${ctx.recipe.key ? '' : 'hidden'}`}>
              <FaUser />
            </div>
            {/* prettier-ignore */}
            <button className="btn--round btn--bookmark" onClick={bookmarkHandler}>
              {/* prettier-ignore */}
              <FaBookmark href={`#icon-bookmark${ctx.recipe.bookmarked ? '-fill' : ''}`} />
            </button>
          </div>

          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              {ctx.recipe.ingredients.map(ing => (
                <li
                  key={`ing-${Math.floor(Math.random() * 10000)}`}
                  className="recipe__ingredient"
                >
                  <div className="recipe__icon">
                    <FaCheck href={`#icon-check`} />
                  </div>
                  {/* Fractional */}
                  <div className="recipe__quantity">
                    {ing.quantity
                      ? new Fraction(ing.quantity).toFraction(true).toString()
                      : ''}
                  </div>
                  <div className="recipe__description">
                    <span className="recipe__unit">{ing.unit}</span>
                    {ing.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by{' '}
              <span className="recipe__publisher">{ctx.recipe.publisher}</span>.
              Please check out directions at their website.
            </p>
            <a
              className="btn--small recipe__btn animate-bounce"
              href={ctx.recipe.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>Directions</span>
              <div className="search__icon">
                <FaArrowRight href={`#icon-arrow-right`} />
              </div>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default React.memo(RecipeFormat);
