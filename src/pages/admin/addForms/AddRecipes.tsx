
import React, { useEffect } from 'react';

import { useForm, useFieldArray , Controller } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';

type Props = {}


interface Ingredient {
  name: string;
  quantity: string;
  unit: string

}


interface NutritionFacts {
  calories: number;
  carbohydrates: number;
  protein: number;
  totalfat: number;
}

interface FormInput {
  title: string;
  description: string;
  mealType: string;
  dietaryType: string;
  prepTime: string;
  cookTime: string;
  nutritionFacts: NutritionFacts
  ingredients: Ingredient[];
  instructions: string[];
  image: FileList
}



const AddHealthyRecipes = (props: Props) => {

  const { register,handleSubmit,setValue, getValues, formState: { errors  , isSubmitSuccessful}, control  , reset} = useForm<FormInput>({
    defaultValues: {
      ingredients: [{ name: "", quantity: "", unit: "" }],
    }
  });
  const axiosPrivate = useAxiosPrivate();

  const { fields: ingredientsFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients'
  });

  const onSubmit = async (data: FormInput) => {

    console.log(data)
    try{
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('mealType', data.mealType);
      formData.append('prepTime', data.prepTime);
      formData.append('cookTime', data.cookTime);
      formData.append('dietaryType', data.dietaryType);
      formData.append('nutritionFacts', JSON.stringify(data.nutritionFacts));
      formData.append('image', data.image[0]); 
    formData.append('ingredients', JSON.stringify(data.ingredients));
    formData.append('instructions', JSON.stringify(data.instructions));
   

     
console.log(formData);
    
    

      const response = await axiosPrivate.post('/recipe/addrecipe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      console.log(response.data);
      if(response.status===200){
        toast.success("Recipe added successfully")
      }


    } catch (error) {
      console.error('Error adding Recipe:', error);
     toast.error("Please try again")
    }
  
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
        reset();
    }
        } , [isSubmitSuccessful ])
  return (


    <>
      <div className="max-w-xl  mx-auto mt-10 border bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-surface-200 text-white text-center font-bold uppercase">
          Add Healthy Recipes
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" {...register("title", {
                required: "title required"
              })} />
            {errors.title && <span className="text-red-500 text-xs italic">{errors.title.message}</span>}
          </div>

          {/* =====================explanation================== */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("description", {
                required: "description required"
              })}></textarea>
            {errors.description && <span className="text-red-500 text-xs italic">{errors.description.message}</span>}
          </div>

          <div className='flex md:flex-row flex-col md:gap-24'>


            {/* ================Mealtype======================== */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                MealType
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("mealType", {
                  required: "mealType required"
                })}>
                <option value="">Select a mealType</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner"> Dinner</option>
                <option value="Snack">Snack</option>
                <option value="Dessert">Dessert</option>
                <option value="Side Dish">Side Dish</option>

              </select>
              {errors.mealType && <span className="text-red-500 text-xs italic">{errors.mealType.message}</span>}
            </div>

            {/* ================Dietrytype======================== */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                DietaryType
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("dietaryType", {
                  required: "dietaryType required"
                })}>
                <option value="">Select a dietaryType</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                

              </select>
              {errors.mealType && <span className="text-red-500 text-xs italic">{errors.mealType.message}</span>}
            </div>
          </div>

          <div className='flex md:flex-row flex-col md:gap-16'>
            {/* =====================preptime================== */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                PrepTime (Minutes)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number" {...register("prepTime", {
                  valueAsNumber: true,
                  required: "PrepTime required" , min:"1"
                })} />
              {errors.prepTime && <span className="text-red-500 text-xs italic">{errors.prepTime.message}</span>}
            </div>
            {/* =====================cooktime================== */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                CookTime (Minutes)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number" {...register("cookTime", {
                  valueAsNumber: true,
                  required: "cookTime required" , min:"1"
                })} />
              {errors.cookTime && <span className="text-red-500 text-xs italic">{errors.cookTime.message}</span>}
            </div>
          </div>


          <div className='flex md:flex-row flex-col md:gap-16'>
            {/* ======calories============ */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                Calories
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number" {...register("nutritionFacts.calories", {
                  valueAsNumber: true,
                  required: "calories required" , min:"1"
                })} />
              {errors.nutritionFacts?.calories && <span className="text-red-500 text-xs italic">{errors.nutritionFacts.calories.message}</span>}
            </div>
            {/* ======Carbohydrates============ */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                Carbohydrates(grams)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number" {...register("nutritionFacts.carbohydrates", {
                  valueAsNumber: true,
                  required: " carbohydrates required", min:"1"
                })} />
              {errors.nutritionFacts?.carbohydrates && <span className="text-red-500 text-xs italic">{errors.nutritionFacts.carbohydrates.message}</span>}
            </div>

          </div>


          <div className='flex md:flex-row flex-col md:gap-16'>
            {/* ======Author============ */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                Protein(grams)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number" {...register("nutritionFacts.protein", {
                  valueAsNumber: true,
                  required: "protein required", min:"1"
                })} />
              {errors.nutritionFacts?.protein && <span className="text-red-500 text-xs italic">{errors.nutritionFacts.protein.message}</span>}
            </div>
            {/* ======Author============ */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                Total Fat(grams)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number" {...register("nutritionFacts.totalfat", {
                  valueAsNumber: true,
                  required: " totalfat required", min:"1"
                })} />
              {errors.nutritionFacts?.totalfat && <span className="text-red-500 text-xs italic">{errors.nutritionFacts.totalfat.message}</span>}
            </div>

          </div>
          {/* ================================ingredients========================= */}

          {ingredientsFields.map((field, index) => (
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">Ingredient {index + 1}</label>
              <div key={field.id} className="flex mb-2">
                <div className="flex flex-col">
                  <input
                    type="text"
                    {...register(`ingredients.${index}.name`, { required: 'Name is required' })}
                    defaultValue={field.name}
                    placeholder="Name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.ingredients && errors.ingredients[index] && (
                    <span className="text-red-500 text-xs italic">{errors.ingredients[index]?.name?.message}</span>
                  )}
                </div>
                <div className="flex flex-col ml-2">
                  <input
                    type="text"
                    {...register(`ingredients.${index}.quantity`, { required: 'Quantity is required' })}
                    defaultValue={field.quantity}
                    placeholder="Quantity"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.ingredients && errors.ingredients[index] && (
                    <span className="text-red-500 text-xs italic">{errors.ingredients[index]?.quantity?.message}</span>
                  )}
                </div>
                <div className="flex ml-2">
                  <input
                    type="text"
                    {...register(`ingredients.${index}.unit`)}
                    defaultValue={field.unit}
                    placeholder="Unit"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                  />
                </div>
                {index !== 0 && (
                  <button
                    type="button"
                    className=" ml-2 py-2 px-4 bg-red-400 text-white  text-sm font-semibold rounded"
                    onClick={() => removeIngredient(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendIngredient({ name: '', quantity: '', unit: '' })}
            className="mt-0.5  py-1 px-2 mb-4 bg-green-500 text-white font-semibold text-sm rounded"
          >
            Add Ingredient
          </button>

<div>
            <label className="block text-gray-700 font-bold mb-2">Instructions</label>
            <Controller
              name="instructions"
              control={control}
              defaultValue={[""]} // Initial value with an empty string
              render={({ field }) => (
                <>
                  {field.value.map((instruction: string, index: number) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        {...field}
                        value={instruction}
                        onChange={(e) => {
                          const newInstructions = [...field.value];
                          newInstructions[index] = e.target.value;
                          field.onChange(newInstructions);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={`Step ${index + 1}`}
                      />
                      {index !== 0 && (
                        <button
                          type="button"
                          className="ml-2 py-2 px-4 bg-red-400 text-white text-sm font-semibold rounded"
                          onClick={() => {
                            const newInstructions = [...field.value];
                            newInstructions.splice(index, 1);
                            field.onChange(newInstructions);
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => field.onChange([...field.value, ''])} // Append a new empty string
                    className="mt-0.5 py-1 px-2 mb-4 bg-green-500 text-white font-semibold text-sm rounded"
                  >
                    Add Step
                  </button>
                </>
              )}
            />
          </div>

          {/* ============================thumbnailURL================================== */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Image
            </label>
            <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    {...register("image", {
      required: "Image is required",
      validate: {
        lessThan10MB: files => files[0]?.size <= 1024 * 1024 ||  "Image size should be less than 1 MB",
        acceptedFormats: files =>
          ['image/jpeg', 'image/png', 'image/gif'].includes(
            files[0]?.type
          ) ||  "Only JPG, JPEG, and PNG file types are allowed",
      },
    })}
    type="file"
  />
            {errors.image && <span className="text-red-500 text-xs italic">{errors.image.message}</span>}
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-surface-200 text-white py-2 px-4 rounded hover:bg-surface-200 focus:outline-none focus:shadow-outline"
              type="submit">
              Add Recipe
            </button>
          </div>

        </form>
      </div>
  
    </>


  )
}

export default AddHealthyRecipes