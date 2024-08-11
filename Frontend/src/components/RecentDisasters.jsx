import React, { useState, useEffect } from "react";
import "./recentDisasters.css";

const RecentDisasters = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events?days=7");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // No filtering, just set all events
        setDisasters(data.events);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch disaster data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
  }, []);

  if (loading) {
    return <div className="recent-disasters"><p>Loading recent disasters...</p></div>;
  }

  if (error) {
    return <div className="recent-disasters"><p>{error}</p></div>;
  }

  return (
    <div className="recent-disasters">
      <h3 className="title">Recent Disasters World Wide</h3>
      <div className="disaster-list">
        {disasters.length > 0 ? (
          disasters.map((disaster) => (
            <div key={disaster.id} className="disaster-item">
              <span className="category">
                {disaster.categories.map((category) => category.title).join(", ")}
              </span>
              <span className="location">| {disaster.title}</span>
              <span className="date">
                | {new Date(disaster.geometry[0]?.date).toLocaleString() ?? "Unknown Date"}
              </span>
            </div>
          ))
        ) : (
          <p>No recent disasters detected.</p>
        )}
      </div>
    </div>
  );
};

export default RecentDisasters;
