import React, { useState } from "react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => void;
  countries: { name: { common: string }; flags: { png: string }; region: string; population: number }[]; // Add region and population
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  countries,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<string>("");

  const filteredCountries = countries.filter((country) => {
    if (filter === "region") {
      return country.region === "Asia";
    } else if (filter === "population") {
      return country.population > 50000000; 
    } else if (filter === "all") {
      return true; 
    }
    return true; 
  });

  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (value === "all" || value === "region" || value === "population") {
      setShowModal(true); 
    } else {
      setShowModal(false); 
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/globe.png" alt="Logo" className="logo" />
        <h3>Country Information</h3>
        
      </div>
      
      <div className="input-box">
        <i className="uil uil-search"></i>
        <input
          type="text"
          placeholder="Search Country here..."
          value={searchQuery}
          onChange={(e) => {
            const query = e.target.value;
            setSearchQuery(query);
            handleSearch(query);
          }}
        />
      </div>
      <div className="dropdown">
        <select
          className="dropdown-select"
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">Select Filter</option>
          <option value="region">Filter by Region (Asia)</option>
          <option value="population">Filter by Population ( 50M)</option>
          <option value="all">Show All Countries</option>
        </select>
      </div>
      {showModal && (
  <div className="popup-container">
    <div className="popup-content">
      <button
        className="close-button"
        onClick={() => setShowModal(false)}
        aria-label="Close"
      >
        &times;
      </button>
      <div className="countries-list">
        {filteredCountries.map((country) => (
          <div key={country.name.common} className="country-item">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="country-flag"
            />
            <span>{country.name.common}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
    </header>
  );
};

export default Header;