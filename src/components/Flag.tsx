import React from "react";

interface FlagProps {
  flagUrl: string;
  alt: string;
}

const Flag: React.FC<FlagProps> = ({ flagUrl, alt }) => (
  <img src={flagUrl} alt={`Flag of ${alt}`} className="img-fluid mb-3" style={{ maxWidth: "150px" }} />
);

export default Flag;
