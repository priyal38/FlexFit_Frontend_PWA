import React, { useEffect, useState } from 'react';
import { FilterOptions } from './Workout';
import useAxiosPrivate from '../../../axios/useAxiosPrivate';
import { FiFilter } from "react-icons/fi";

interface Props {
    filterOptions: FilterOptions;
    setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
    onFilterChange: () => void;
}

interface FilterData {
    categories: string[];
    subcategories: string[];
    difficultyLevels: string[];
}
const Filters = ({ filterOptions, setFilterOptions, onFilterChange }: Props) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [filterdata, setFilterdata] = useState<FilterData>({
        categories: [],
        subcategories: [],
        difficultyLevels: [],
    });
    const axiosPrivate = useAxiosPrivate()


    const getFilterData = async () => {
        try {
            const response = await axiosPrivate.get('/workout/getfilterdata');
            // console.log(response)
            const { categories, subcategories, difficultyLevels } = response.data.data;
            setFilterdata({ categories, subcategories, difficultyLevels });
        } catch (error) {
            console.error('Error fetching filters:', error);
        }
    };

    useEffect(() => {
        getFilterData()
    }, [])

    // console.log(filterdata);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleApplyFilters = () => {
        setShowDropdown(false);
        onFilterChange();
    };

    const handleClearAll = () => {
        // Reset selected options
        setFilterOptions( {
            selectedCategories: [],
            selectedSubcategories: [],
            selectedDifficulties: [],
        });
    
        if(filterOptions.selectedCategories.length === 0  && filterOptions.selectedDifficulties.length === 0 && filterOptions.selectedSubcategories.length === 0 ){
            
            onFilterChange();
            setShowDropdown(false);
        }
    
        
        
    };
    
  
    
   
    

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            selectedCategories: checked
                ? [...prevOptions.selectedCategories, value]
                : prevOptions.selectedCategories.filter((category) => category !== value),
        }));
    };

    const handleSubcategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            selectedSubcategories: checked
                ? [...prevOptions.selectedSubcategories, value]
                : prevOptions.selectedSubcategories.filter((subcategory) => subcategory !== value),
        }));
    };

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            selectedDifficulties: checked
                ? [...prevOptions.selectedDifficulties, value]
                : prevOptions.selectedDifficulties.filter((level) => level !== value),
        }));
    };
    return (
        <div>
            <div className=" relative flex flex-col items-center  ">
                <button
                    onClick={handleDropdownToggle}
                    className="text-white focus:ring-1 tracking-wider focus:outline-none font-medium rounded-lg text-md px-2 py-2 text-center items-center justify-center inline-flex bg-primary-500 hover:bg-primary-400 w-44 focus:ring-primary-600"
                    type="button"
                >
                    Apply Filters

                    <FiFilter className='ml-2 w-4 h-4'/>
                   
                </button>

                {showDropdown && (
                    <div className=" absolute mt-10 py-5 px-8 rounded-lg shadow-inner shadow-slate-700 bg-surface-200">
                        <div className='flex flex-col xs:flex-row gap-8'>

                            {/* category filter data */}
                            <div >

                                <h6 className="mb-3 text-sm font-medium text-white">Category</h6>
                                <ul className="space-y-2 text-sm" >
                                    {filterdata.categories.map(category => (
                                        <li key={category} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value={category}
                                                checked={filterOptions.selectedCategories.includes(category)}
                                                onChange={handleCategoryChange}
                                                className="w-4 h-4  rounded text-primary-600 focus:ring-primary-600 ring-offset-gray-700 focus:ring-0 bg-gray-600 border-gray-500"
                                            />
                                            <label  className="ml-2 text-sm font-medium text-gray-100 capitalize">{category}</label>
                                        </li>
                                    ))}
                                </ul>

                                <div>

<h6 className="mb-3 mt-6 text-sm font-medium text-white">Difficulty </h6>
<ul className="space-y-2 text-sm">

    {filterdata.difficultyLevels.map(level => (
        <li key={level} className="flex items-center">
            <input
                type="checkbox"
                value={level}
                checked={filterOptions.selectedDifficulties.includes(level)}
                onChange={handleDifficultyChange}
                className="w-4 h-4  rounded text-primary-600 focus:ring-primary-600 ring-offset-gray-700 focus:ring-0 bg-gray-600 border-gray-500"
            />
            <label  className="ml-2 text-sm font-medium text-gray-100 capitalize">{level}</label>
        </li>
    ))}

</ul>
</div>
                            </div>

                            {/* subcategories filter */}
                            <div>

                                <h6 className="mb-3 text-sm font-medium text-white">Subcategory</h6>
                                <ul className="space-y-2 text-sm" >

                                    {filterdata.subcategories.map(subcategory => (
                                        <li key={subcategory} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value={subcategory}
                                                checked={filterOptions.selectedSubcategories.includes(subcategory)}
                                                onChange={handleSubcategoryChange}
                                                className="w-4 h-4  rounded text-primary-600 focus:ring-primary-600 ring-offset-gray-700 focus:ring-0 bg-gray-600 border-gray-500"
                                            />
                                            <label  className="ml-2 text-sm font-medium text-gray-100">{subcategory}</label>
                                        </li>
                                    ))}

                                </ul>
                            </div>

                            {/* difficultyLevel filter */}
                          
                        </div>

                        <div className='flex justify-center gap-4'>

                        <button onClick={handleApplyFilters} className="bg-primary-500 text-white py-2 px-3 mt-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 text-xs font-medium tracking-wide">
                            Apply Filters
                        </button>
                        <button onClick={handleClearAll} className="bg-primary-500 text-white py-2 px-3 mt-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 text-xs font-medium tracking-wide">
                        Clear All
                        </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filters;
