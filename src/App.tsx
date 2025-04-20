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
      .get("https://countries-api-abhishek.vercel.app/countries")
      .then((res) => {
        console.log("API Response:", res.data);
  
        const countriesData = res.data.data;
  
        if (Array.isArray(countriesData)) {
          const mappedCountries = countriesData.map((country: any) => {
            console.log("Country Data:", country); // Debugging line
  
            return {
              name: { common: country.name },
              capital: country.capital ? [country.capital] : undefined,
              region: country.region,
              subregion: country.subregion,
              population: country.population,
              area: country.area,
              latlng: country.coordinates
                ? [country.coordinates.latitude, country.coordinates.longitude] as [number, number]
                : [0, 0] as [number, number],
              borders: country.borders,
              timezones: country.timezones,
              currencies: country.currency
              ? {
                  [country.currency.match(/\(([^)]+)\)/)?.[1] || "Unknown Code"]: {
                    name: country.currency.split(" (")[0] || "Unknown Currency",
                    symbol: "", // Add a placeholder for symbol if not available
                  },
                }
              : {},
              languages: country.languages,
              flags: { png: country.flag, svg: country.flag },
              cca3: country.alpha3Code,
            };
          });
  
          setCountries(mappedCountries);
          setFilteredCountries(mappedCountries);
  
          const afghanistan = mappedCountries.find(
            (country: Country) => country.name.common === "Afghanistan"
          );
          if (afghanistan) setSelectedCountry(afghanistan);
        } else {
          console.error("Unexpected API response format:", countriesData);
          alert("Failed to load countries. Unexpected response format.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch countries:", err);
        alert("Failed to load countries. Please try again later.");
      });
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
            onCountrySelect={(borderCode) => {
              const borderCountry = countries.find((c) => c.cca3 === String(borderCode));
              if (borderCountry) {
                setSelectedCountry(borderCountry);
              }
            }}
          />
        )}
      </div>
      <Footer />
    </Router>
  );
};

export default App;