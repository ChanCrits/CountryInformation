import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const fetchVisitorIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const visitorIP = data.ip;

        // Check if the IP is already counted
        const countedIPs = JSON.parse(localStorage.getItem("countedIPs") || "[]");
        if (!countedIPs.includes(visitorIP)) {
          // Increment visitor count and store the IP
          const currentCount = parseInt(localStorage.getItem("visitorCount") || "0", 10);
          const newCount = currentCount + 1;
          localStorage.setItem("visitorCount", newCount.toString());
          setVisitorCount(newCount);

          // Add the IP to the counted list
          countedIPs.push(visitorIP);
          localStorage.setItem("countedIPs", JSON.stringify(countedIPs));
        } else {
          // Fetch the current visitor count
          const currentCount = parseInt(localStorage.getItem("visitorCount") || "0", 10);
          setVisitorCount(currentCount);
        }
      } catch (error) {
        console.error("Failed to fetch visitor IP:", error);
      }
    };

    fetchVisitorIP();
  }, []);

  return (
    <footer className="footer">
      <div className="visitor-count">
        <img
          src="visitors.png" // Replace with your icon path
          alt="Visitor Icon"
          className="visitor-icon"
        />
        Visitors: {visitorCount}
      </div>
      <p>© 2025 Country Info Visualizer | Siong</p>
    </footer>
  );
};

export default Footer;