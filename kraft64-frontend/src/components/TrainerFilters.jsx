import React from 'react';

const filters = [
  "Bharatanatyam",
  "Painting in Tamil",
  "Tamil Language Learning",
  "Sculpture",
  "Pottery",
  "Tanjore Painting",
  "Tanjore Dolls"
];

const TrainerFilters = ({ selectedFilters, setSelectedFilters }) => {
  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="trainer-filters">
      <h3>Filter by Category</h3>
      {filters.map((filter, index) => (
        <label key={index}>
          <input
            type="checkbox"
            checked={selectedFilters.includes(filter)}
            onChange={() => toggleFilter(filter)}
          />
          {filter}
        </label>
      ))}
    </div>
  );
};

export default TrainerFilters;
