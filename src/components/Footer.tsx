//
import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        // Fetch the visitor's IP address
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const visitorIP = ipData.ip;

        // Fetch the current visitor data from JSONBin
        const binResponse = await fetch("https://api.jsonbin.io/v3/b/67f93b1d8960c979a58320cc", {
          headers: {
            "X-Master-Key": "$2a$10$wMRaiZnIvQURH/FT61YRp.Lc9dRC.hFWzvDYmahRDx5q63cOftnwi",
          },
        });
        const binData = await binResponse.json();
        const { visitorCount, countedIPs } = binData.record;

        // Check if the IP is already counted
        if (!countedIPs.includes(visitorIP)) {
          // Increment the visitor count and add the IP
          const updatedVisitorCount = visitorCount + 1;
          const updatedIPs = [...countedIPs, visitorIP];

          // Update the JSONBin with the new data
          await fetch("https://api.jsonbin.io/v3/b/67f93b1d8960c979a58320cc", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key": "$2a$10$wMRaiZnIvQURH/FT61YRp.Lc9dRC.hFWzvDYmahRDx5q63cOftnwi",
            },
            body: JSON.stringify({
              visitorCount: updatedVisitorCount,
              countedIPs: updatedIPs,
            }),
          });

          setVisitorCount(updatedVisitorCount);
        } else {
          setVisitorCount(visitorCount);
        }
      } catch (error) {
        console.error("Failed to fetch visitor data:", error);
      }
    };

    fetchVisitorData();
  }, []);

  return (
    <footer className="footer">
      <div className="visitor-count">
        <img
          src="/visitors.png"
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