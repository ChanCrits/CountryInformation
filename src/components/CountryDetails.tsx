
import { Country } from "../types/country";
import Flag from "./Flag";
import Borders from "./Borders";
import "../index.css";

interface CountryDetailsProps {
  country: Country;
  countries: Country[];
  onCountrySelect: (country: Country) => void;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({
  country,
  countries,
  onCountrySelect,
}) => {
 
  const {
    name,
    capital,
    region,
    subregion,
    population,
    area,
    latlng,
    borders = [],
    timezones,
    currencies,
    languages,
    flags,
  } = country;

    const handleBorderClick = (borderCode: string) => {
    const borderCountry = countries.find((c) => c.cca3 === borderCode);
    if (borderCountry) {
      onCountrySelect(borderCountry);
    } else {
      console.error(`Border country with code "${borderCode}" not found in countries array.`);
    }
  };
   // Fetch visitor IP and count unique visitors
  

  return (
    <div className="country-details">
      <h2>{name.common}</h2>
      <Flag flagUrl={flags.png} alt={name.common} />
      <p>
        <strong>Capital:</strong> {capital?.[0]}
      </p>
      <p>
        <strong>Region:</strong> {region} / {subregion}
      </p>
      <p>
        <strong>Population:</strong> {population.toLocaleString()}
      </p>
      <p>
        <strong>Area:</strong> {area.toLocaleString()} km²
      </p>
      <p>
        <strong>Coordinates:</strong> {latlng.join(", ")}
      </p>
      <p>
        <strong>Timezones:</strong> {timezones.join(", ")}
      </p>
      <p>
        <strong>Currencies:</strong>{" "}
        {currencies &&
          Object.values(currencies)
            .map((c) => c.name)
            .join(", ")}
      </p>
      <p>
        <strong>Languages:</strong>{" "}
        {languages && Object.values(languages).join(", ")}
      </p>
      <Borders
        borders={borders}
        countries={countries}
        onCountrySelect={handleBorderClick}
      />
  
    </div>
  );
};

export default CountryDetails;