import React, { useEffect, useState } from 'react'
import { RecipeData } from '../../../components/dashboard/recipe/Recipe';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';
import { useParams } from 'react-router-dom';

type Props = {}

const RecipeDetails = (props: Props) => {

    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [recipeDetails, setRecipeDetails] = useState<RecipeData | null>(null);

    const fetchRecipeDetails = async () => {
        try {
            const response = await axiosPrivate.get(`/recipe/getrecipe/${id}`);
            console.log(response);

            setRecipeDetails(response.data.data);
        } catch (error) {
            console.error('Error fetching workout details:', error);
        }
    };

    useEffect(() => {
        fetchRecipeDetails();
    }, [id]);
    return (
        <div>


            <div className="mb-4 md:mb-0 w-full mx-auto lg:w-[90%] ">
                <div className="md:max-w-2.5xl  md:rounded-xl">

                    <section className="flex flex-col gap-4">
                        <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-white leading-tight">
                            {recipeDetails?.title}
                        </h2>
                        <p className="py-2 text-gray-300 inline-flex  capitalize items-center justify-center mb-2">
                            {recipeDetails?.description}
                        </p>
                    </section>
                    <div className='sm:h-[24rem] h-64 w-full mt-2'>
                        <img
                            className="w-full  h-full object-fit rounded-md"
                            src={`http://localhost:5000/${recipeDetails?.image}`}
                            alt="Image not loading"
                        />
                    </div>

                    <article className="flex flex-col justify-center  py-9">

                        <div className='flex flex-wrap item-center lg:gap-20 gap-4'>
                            <table className=' lg:w-[20rem] mx-auto w-full shadow-inner mt-2 px-4 text-white text-sm mb-2 rounded-xl'>
                                <thead className='text-lg uppercase border-b border-gray-500 bg-surface-300 tracking-wide text-white'>

                                    <tr>
                                        <th className='px-6 py-3 text-center text-primary-600' colSpan={2}>Overview</th>
                                    </tr>

                                </thead>
                                <tbody>

                                    <tr className='border-b bg-surface-200 border-gray-700  hover:bg-surface-100 '>
                                        <td className='px-6 py-3'>MealType:</td>
                                        <td className='px-4 py-3'>{recipeDetails?.mealType}</td>
                                    </tr>
                                    <tr className='border-b bg-surface-200 border-gray-700  hover:bg-surface-100'>
                                        <td className='px-6 py-3'>DietaryType:</td>
                                        <td className='px-4 py-3'>{recipeDetails?.dietaryType}</td>
                                    </tr>
                                    <tr className='border-b bg-surface-200 border-gray-700  hover:bg-surface-100'>
                                        <td className='px-6 py-3'>Preparation Time:</td>
                                        <td className='px-4 py-3'>{recipeDetails?.prepTime}</td>
                                    </tr>
                                    <tr className='border-b bg-surface-200 border-gray-700  hover:bg-surface-100'>
                                        <td className='px-6 py-3'>Cooking Time:</td>
                                        <td className='px-4 py-3'>{recipeDetails?.cookTime}</td>
                                    </tr>
                                </tbody>
                            </table>


                            <table className=' lg:w-[20rem] w-full mx-auto shadow-inner mt-2 text-white text-sm mb-2 rounded-xl'>
                                <thead className='text-lg uppercase bg-surface-300 border-b border-gray-500 tracking-wide text-white'>

                                    <tr>
                                        <th className='px-6 py-3 text-center text-primary-600' colSpan={2}>Nutrition Facts</th>
                                    </tr>

                                </thead>
                                <tbody>

                                    <tr className='border-b bg-surface-200 border-gray-700  hover:bg-surface-100'>
                                        <td className='px-6 py-3'>Calories:</td>
                                        <td className='px-4 py-3'>{recipeDetails?.nutritionFacts?.calories}</td>
                                    </tr>
                                    <tr className='border-b bg-surface-200 border-gray-700 hover:bg-surface-100'>
                                        <td className='px-6 py-3'>Carbohydrate:</td>
                                        <td className='px-4 py-3'>{recipeDetails?.nutritionFacts?.carbohydrates} g</td>
                                    </tr>
                                    <tr className='border-b bg-surface-200 border-gray-700  hover:bg-surface-100'>
                                        <td className='px-6 py-3'>Protein:</td>
                                        <td className='px-4 py-3'>{recipeDetails?.nutritionFacts?.protein} g</td>
                                    </tr>
                                    <tr className='border-b bg-surface-200 border-gray-700  hover:bg-surface-100'>
                                        <td className='px-6 py-3'>Total Fat:</td>
                                        <td className='px-4 py-3'>{recipeDetails?.nutritionFacts?.totalfat} g</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <hr className='opacity-20 mt-4' />

                        <div className='flex lg:flex-row flex-col lg:ml-10  mt-4'>


                            <div className=" w-[40rem]  py-4  text-white ">
                                <h3 className='text-lg lg:text-xl font-semibold text-primary-600 leading-tight mb-3'>Ingredients</h3>
                                <ul className="list-inside text-sm list-disc">

                                    {recipeDetails?.ingredients.map((item, index) => (
                                        <li key={index} className="mb-2">
                                            <span>{item.quantity} {item.unit}</span>
                                            <span className='mx-3 text-gray-200'>{item.name}</span>
                                        </li>
                                    ))}

                                </ul>
                            </div>


                            <div className=" w-full py-4  text-white">
                                <h3 className='text-lg lg:text-xl font-semibold text-primary-600 leading-tight mb-3'>Instructions</h3>
                                <ol className="flex flex-col justify-center  text-justify gap-2 list-decimal list-outside px-6 text-sm  marker:font-bold">
                                    {recipeDetails?.instructions.map((item, index) => (
                                        <li key={index} className='pl-3'>{item}</li>
                                    ))}
                                </ol>
                            </div>

                        </div>


                    </article>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails