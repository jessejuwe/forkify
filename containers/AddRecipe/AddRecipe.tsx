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
  ing_1: string;
  ing_2: string;
  ing_3: string;
  ing_4: string;
  ing_5: string;
  ing_6: string;
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
    ing_1: '',
    ing_2: '',
    ing_3: '',
    ing_4: '',
    ing_5: '',
    ing_6: '',
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

                if (!values.ing_1) errors.ing_1 = 'Required';
                if (!values.ing_2) errors.ing_2 = 'Required';
                if (!values.ing_3) errors.ing_3 = 'Required';
                if (!values.ing_4) errors.ing_4 = 'Required';
                if (!values.ing_5) errors.ing_5 = 'Required';
                if (!values.ing_6) errors.ing_6 = 'Required';

                return errors;
              }}
              onSubmit={(values, actions) => {
                // TODO

                const ingredients: any = [];

                if (values.ing_1 !== '') ingredients.push(values.ing_1);
                if (values.ing_2 !== '') ingredients.push(values.ing_2);
                if (values.ing_3 !== '') ingredients.push(values.ing_3);
                if (values.ing_4 !== '') ingredients.push(values.ing_4);
                if (values.ing_5 !== '') ingredients.push(values.ing_5);
                if (values.ing_6 !== '') ingredients.push(values.ing_6);

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

                    <label htmlFor="title">Title</label>
                    <Field
                      type="text"
                      name="title"
                      placeholder="Recipe is called?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      innerRef={inputRef}
                      required
                    />

                    <label htmlFor="sourceUrl">URL</label>
                    <Field
                      type="text"
                      name="sourceUrl"
                      placeholder="Recipe can be found where?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.sourceUrl}
                      required
                    />

                    <label htmlFor="image">Image URL</label>
                    <Field
                      type="text"
                      name="image"
                      placeholder="Image can be found where?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.image}
                      required
                    />

                    <label htmlFor="publisher">Publisher</label>
                    <Field
                      type="text"
                      name="publisher"
                      placeholder="This recipe is published by?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.publisher}
                      required
                    />

                    <label htmlFor="cookingTime">Prep. Time</label>
                    <Field
                      type="text"
                      name="cookingTime"
                      placeholder="Takes how long to prepare?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cookingTime}
                      required
                    />

                    <label htmlFor="servings">Servings</label>
                    <Field
                      type="text"
                      name="servings"
                      placeholder="What's the serving ratio?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.servings}
                      required
                    />
                  </div>

                  <div className="upload__column">
                    <h3 className="upload__heading">Ingredients</h3>
                    <label htmlFor="ing_1">ING. 1</label>
                    <Field
                      type="text"
                      name="ing_1"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ing_1}
                    />

                    <label htmlFor="ing_2">ING. 2</label>
                    <Field
                      type="text"
                      name="ing_2"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ing_2}
                    />

                    <label htmlFor="ing_3">ING. 3</label>
                    <Field
                      type="text"
                      name="ing_3"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ing_3}
                    />

                    <label htmlFor="ing_4">ING. 4</label>
                    <Field
                      type="text"
                      name="ing_4"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ing_4}
                    />

                    <label htmlFor="ing_5">ING. 5</label>
                    <Field
                      type="text"
                      name="ing_5"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ing_5}
                    />

                    <label htmlFor="ing_6">ING. 6</label>
                    <Field
                      type="text"
                      name="ing_6"
                      placeholder="Format: 'Quantity,Unit,Description'"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ing_6}
                    />
                  </div>

                  <button
                    type="submit"
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
