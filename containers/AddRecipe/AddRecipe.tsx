import React, { useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { FaUpload } from 'react-icons/fa';

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
  ingredients: string;
}

type Props = {};

const AddRecipe: React.FC<Props> = props => {
  const ctx = useContext(RecipeContext);

  const router = useRouter();

  const initialValues: MyFormValues = {
    title: '',
    publisher: '',
    sourceUrl: '',
    image: '',
    servings: '',
    cookingTime: '',
    ingredients: '',
  };

  const inputRef = useRef<HTMLInputElement>(null);

  let recipeData: Recipe;
  const ingredients: any = [];

  useEffect(() => {
    inputRef.current?.focus();
    return () => {};
  }, []);

  const uploadHandler = (newRecipe: Recipe) => {
    ctx?.uploadRecipe(newRecipe);
  };

  const addIngredient = (values: MyFormValues) => {
    // Guard clause
    if (!values.ingredients) return;

    ingredients.push(values.ingredients);
    values.ingredients = '';

    console.log(ingredients);
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
                if (!values.ingredients) errors.cookingTime = 'Required';

                return errors;
              }}
              onSubmit={(values, actions) => {
                try {
                  // prettier-ignore
                  if (ingredients.length === 0) throw new Error('Add an Ingredient 💥');

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
                } catch (err: any) {
                  alert(err.message);
                }

                router.push('/');

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

                    <label htmlFor="ingredients">Ingredients</label>
                    <div className="add__ingredient">
                      <Field
                        type="text"
                        name="ingredients"
                        id="ing-field"
                        placeholder="Format: 'Quantity,Unit,Description'"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ingredients}
                        required
                      />

                      <button
                        type="button"
                        onClick={() => addIngredient(values)}
                        disabled={isSubmitting}
                        className="btn--small"
                      >
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {/* <div className="upload__column">
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
                  </div> */}

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
