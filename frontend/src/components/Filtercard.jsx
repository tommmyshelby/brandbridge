import React, { useState } from "react";
import { Button } from "./ui/button"; // Assuming you have a Button component

const filterOptions = [
  {
    filterType: "Category",
    options: ["All", "Fashion", "Tech", "Education", "Food", "Health", "Finance"],
    key: "gigCategory"
  },
  {
    filterType: "Age Group",
    options: ["All", "18-24", "25-34", "35-44", "45-54", "55+"],
    key: "targetAgeGroup"
  },
  {
    filterType: "Budget",
    options: ["All", "Under 10k", "10k-50k", "50k-100k", "Above 100k"],
    key: "gigBudget"
  }
];

function FilterCard({ applyFilters }) {
  const [filters, setFilters] = useState({
    gigCategory: "All",
    targetAgeGroup: "All",
    gigBudget: "All"
  });

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
  };

  return (
    <div className="p-4  rounded-lg shadow-xl w-72">
      <h1 className="text-lg font-bold text-black mb-3">Filter Gigs</h1>
      <div className="space-y-3">
        {filterOptions.map((filter, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium text-black mb-1">
              {filter.filterType}
            </label>
            <select
              className=" text-black text-lg rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={filters[filter.key]}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            >
              {filter.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <Button
        onClick={handleApplyFilters}
        className="w-full mt-4 bg-zinc-700 text-white py-2 rounded-md hover:bg-zinc-800"
      >
        Apply Filters
      </Button>
    </div>
  );
}

export default FilterCard;
