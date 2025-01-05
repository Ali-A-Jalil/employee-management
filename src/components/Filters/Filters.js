import React, { useState, useCallback } from "react";

const Filters = React.memo(({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumn, setFilterColumn] = useState("name");

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleFilterChange = useCallback(
    (e) => {
      const value = e.target.value;
      setFilterColumn(value);
      onFilter(value);
    },
    [onFilter]
  );

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-full md:w-1/3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 md:mb-0"
      />

      {/* Filter Dropdown */}
      <select
        value={filterColumn}
        onChange={handleFilterChange}
        className="w-full md:w-1/4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="age">Age</option>
      </select>
    </div>
  );
});

export default Filters;
