import React, { useContext, useEffect, useRef } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { FaSearch, FaEdit, FaBookmark, FaSmile } from 'react-icons/fa';

import { images } from '../../constants';
import { RecipeContext } from '../../context/recipe-context';

interface MyFormValues {
  recipe: string;
}

type Props = {};

const Navbar: React.FC<Props> = props => {
  const ctx = useContext(RecipeContext);

  const initialValues: MyFormValues = { recipe: '' };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    return () => {};
  }, []);

  return (
    <div className="header">
      <Image
        src={images.logo}
        alt="logo"
        className="header__logo"
        width={112.59}
        height={36.8}
      />

      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors: FormikErrors<MyFormValues> = {};

          // if (!values.recipe) errors.recipe = 'Required';

          return errors;
        }}
        onSubmit={(values, actions) => {
          // TODO
          console.log(ctx);
          ctx?.searchQuery(values.recipe); // triggers a function in the context

          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form className="search">
            <div className="navbar-form-field app__flex">
              <Field
                type="text"
                name="recipe"
                placeholder="Search over 1,000,000 recipes..."
                className="search__field"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.recipe}
                innerRef={inputRef}
              />
              <ErrorMessage name="recipe" component="div" className="error" />
            </div>

            <button
              type="submit"
              onClick={() => ctx?.searchQuery(values.recipe)}
              disabled={isSubmitting}
              className="btn search__btn"
            >
              <div className="search__icon flex space-x-4 items-center">
                <FaSearch />
                <span>Search</span>
              </div>
            </button>
          </Form>
        )}
      </Formik>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button className="nav__btn nav__btn--add-recipe">
              <div className="nav__icon flex items-center">
                <FaEdit />
                <Link href="/newrecipe">
                  <span>Add Recipe</span>
                </Link>
              </div>
            </button>
          </li>
          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks">
              <div className="nav__icon flex items-center">
                <FaBookmark />
                <span>Bookmarks</span>
              </div>
            </button>

            <div className="bookmarks">
              <ul className="bookmarks__list">
                <div className="message flex items-center">
                  <FaSmile />
                  <p>No bookmarks yet. Find a nice recipe and bookmark it</p>
                </div>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
