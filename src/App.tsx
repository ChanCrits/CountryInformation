import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CountryDetails from "./components/CountryDetails";
import { Country } from "./types/country";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
        setFilteredCountries(res.data); 
        const china = res.data.find(
          (country) => country.name.common === "China"
        );
        if (china) setSelectedCountry(china);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);

    if (filtered.length > 0) {
      setSelectedCountry(filtered[0]); 
    } else {
      setSelectedCountry(null); 
    }
  };

  return (
    <Router>
          <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        countries={countries} 
      />
      <div className="container my-2">
        {selectedCountry && (
          <CountryDetails
            country={selectedCountry}
            countries={filteredCountries}
            onCountrySelect={setSelectedCountry}
          />
        )}
      </div>
      <Footer />
    </Router>
  );
};

export default App;