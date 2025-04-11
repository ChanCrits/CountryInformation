import React from "react";
import { Country } from "../types/country";

interface BordersProps {
  borders: string[];
  countries: Country[];
  onCountrySelect: (borderCode: string) => void;
}

const Borders: React.FC<BordersProps> = ({ borders, countries, onCountrySelect }) => {
  const getBorderName = (borderCode: string) => {
    const country = countries.find((c) => c.cca3 === borderCode);
    return country ? country.name.common : borderCode;
  };

  return (
    <div className="borders">
      <strong>Borders:</strong>{" "}
      {borders.length > 0 ? (
        borders.map((border) => (
          <button
            key={border}
            onClick={() => onCountrySelect(border)}
            className="border-button"
          >
            {getBorderName(border)}
          </button>
        ))
      ) : (
        <span>No borders available</span>
      )}
    </div>
  );
};

export default Borders;