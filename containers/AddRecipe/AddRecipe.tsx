import React, { useEffect, useContext, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { FaUpload, FaBackspace } from 'react-icons/fa';

import { RecipeContext } from '../../context/recipe-context';
import Recipe from '../../model/Recipe';
import Card from '../../components/Card/Card';
import Modal from '../../components/Modal/Modal';

interface MyFormValues {
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number | string;
  cookingTime: number | string;
  ingredient_1: string;
  ingredient_2: string;
  ingredient_3: string;
  ingredient_4: string;
  ingredient_5: string;
  ingredient_6: string;
}

type Props = {};

const AddRecipe: React.FC<Props> = props => {
  const ctx = useContext(RecipeContext);

  const initialValues: MyFormValues = {
    title: '',
    publisher: '',
    sourceUrl: '',
    image: '',
    servings: '',
    cookingTime: '',
    ingredient_1: '',
    ingredient_2: '',
    ingredient_3: '',
    ingredient_4: '',
    ingredient_5: '',
    ingredient_6: '',
  };

  const inputRef = useRef<HTMLInputElement>(null);

  let recipeData: Recipe;

  useEffect(() => {
    inputRef.current?.focus();
    return () => {};
  }, []);

  const uploadHandler = (newRecipe: Recipe) => {
    ctx?.uploadRecipe(newRecipe);
  };

  return (
    <>
      {ctx?.modalError && (
        <Modal
          onConfirm={() => ctx.closeModal()}
          title={ctx.modalError.title}
          message={ctx.modalError.message}
        />
      )}

      {!ctx.uploadLoading && (
        <Card className="">
          <div className="add-recipe-window">
            <Formik
              initialValues={initialValues}
              validate={values => {
                const errors: FormikErrors<MyFormValues> = {};

                if (!values.title) errors.title = 'Required';
                if (!values.publisher) errors.publisher = 'Required';
                if (!values.sourceUrl) errors.sourceUrl = 'Required';
                if (!values.image) errors.image = 'Required';
                if (!values.servings) errors.servings = 'Required';
                if (!values.cookingTime) errors.cookingTime = 'Required';

                if (!values.ingredient_1) errors.ingredient_1 = 'Required';
                if (!values.ingredient_2) errors.ingredient_2 = 'Required';
                if (!values.ingredient_3) errors.ingredient_3 = 'Required';
                if (!values.ingredient_4) errors.ingredient_4 = 'Required';
                if (!values.ingredient_5) errors.ingredient_5 = 'Required';
                if (!values.ingredient_6) errors.ingredient_6 = 'Required';

                return errors;
              }}
              onSubmit={(values, actions) => {
                // TODO

                const ingredients: any = [];

                // prettier-ignore
                if (values.ingredient_1 !== '') ingredients.push(values.ingredient_1);
                // prettier-ignore
                if (values.ingredient_2 !== '') ingredients.push(values.ingredient_2);
                // prettier-ignore
                if (values.ingredient_3 !== '') ingredients.push(values.ingredient_3);
                // prettier-ignore
                if (values.ingredient_4 !== '') ingredients.push(values.ingredient_4);
                // prettier-ignore
                if (values.ingredient_5 !== '') ingredients.push(values.ingredient_5);
                // prettier-ignore
                if (values.ingredient_6 !== '') ingredients.push(values.ingredient_6);

                console.log(ingredients);

                recipeData = {
                  id: `myrecipe-${Math.floor(Math.random() * 10000)}`,
                  title: values.title,
                  publisher: values.publisher,
                  sourceUrl: values.sourceUrl,
                  image: values.image,
                  servings: +values.servings,
                  cookingTime: +values.cookingTime,
                  ingredients,
                };

                uploadHandler(recipeData); // triggers a function in the context

                actions.setSubmitting(false);
                actions.resetForm();
              }}
            >
              {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
                <Form className="upload">
                  <div className="upload__column">
                    <h3 className="upload__heading">Recipe Data</h3>

                    {/* prettier-ignore */}
                    <label htmlFor="title" className={!errors.title ? '' : 'label-error'}>Title</label>
                    <Field
                      type="text"
                      name="title"
                      placeholder="Recipe is called?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      // innerRef={inputRef}
                    />

                    {/* prettier-ignore */}
                    <label htmlFor="sourceUrl" className={!errors.sourceUrl ? '' : 'label-error'}>URL</label>
                    <Field
                      type="text"
                      name="sourceUrl"
                      placeholder="Recipe can be found where?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.sourceUrl}
                    />

                    {/* prettier-ignore */}
                    <label htmlFor="image" className={!errors.image ? '' : 'label-error'}>Image URL</label>
                    <Field
                      type="text"
                      name="image"
                      placeholder="Image can be found where?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.image}
                    />

                    <label
                      htmlFor="publisher"
                      className={!errors.publisher ? '' : 'label-error'}
                    >
                      Publisher
                    </label>
                    <Field
                      type="text"
                      name="publisher"
                      placeholder="This recipe is published by?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.publisher}
                    />

                    <label
                      htmlFor="cookingTime"
                      className={!errors.cookingTime ? '' : 'label-error'}
                    >
                      Prep. Time
                    </label>
                    <Field
                      type="text"
                      name="cookingTime"
                      placeholder="Takes how long to prepare?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cookingTime}
                    />

                    <label
                      htmlFor="servings"
                      className={!errors.servings ? '' : 'label-error'}
                    >
                      Servings
                    </label>
                    <Field
                      type="text"
                      name="servings"
                      placeholder="What's the serving ratio?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.servings}
                    />
                  </div>

                  <div className="upload__column">
                    <h3 className="upload__heading">Ingredients</h3>
                    <label htmlFor="ingredient-1">ING. 1</label>
                    <Field
                      type="text"
                      name="ingredient-1"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ingredient_1}
                      required
                    />

                    <label htmlFor="ingredient-2">ING. 2</label>
                    <Field
                      type="text"
                      name="ingredient-2"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ingredient_2}
                      required
                    />

                    <label htmlFor="ingredient-3">ING. 3</label>
                    <Field
                      type="text"
                      name="ingredient-3"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ingredient_3}
                      required
                    />

                    <label htmlFor="ingredient-4">ING. 4</label>
                    <Field
                      type="text"
                      name="ingredient-4"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ingredient_4}
                      required
                    />

                    <label htmlFor="ingredient-5">ING. 5</label>
                    <Field
                      type="text"
                      name="ingredient-5"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ingredient_5}
                      required
                    />

                    <label htmlFor="ingredient-6">ING. 6</label>
                    <Field
                      type="text"
                      name="ingredient-6"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ingredient_6}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={() => uploadHandler(recipeData)}
                    disabled={isSubmitting}
                    className="btn upload__btn"
                  >
                    <div className="search__icon flex space-x-4 items-center">
                      <FaUpload />
                      <span>Upload</span>
                    </div>
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      )}
    </>
  );
};

export default AddRecipe;
