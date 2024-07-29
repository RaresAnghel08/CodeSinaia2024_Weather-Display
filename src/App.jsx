// App.jsx
import React, { useState, useEffect } from 'react';
import { fetchData } from './utilities/fetchData.js';
import * as Components from './components/components.jsx';
import { destructureDate } from './utilities/time_data.js';
import Loader from './Loader.jsx'; // Importă componenta Loader
import './App.css'; // Asigură-te că importi stilurile

function App() {
  const [data, setData] = useState();
  const [city, setCity] = useState("Bucuresti"); // Default city
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(destructureDate(new Date()));

  // Function to get the city name from coordinates (mock implementation)
  const fetchCityFromCoordinates = async (lat, lon) => {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    const data = await response.json();
    return data.city || "Unknown City";
  };

  useEffect(() => {
    // Fetch data immediately on component mount
    const fetchInitialData = async () => {
      try {
        const date = new Date();
        setCurrentTime(destructureDate(date));

        const data = await fetchData();
        setData(data);

        // Get user's location
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const city = await fetchCityFromCoordinates(latitude, longitude);
            setCity(city);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching location:", error);
            setLoading(false); // Handle error appropriately
          }
        );
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setLoading(false);
      }
    };

    fetchInitialData(); // Fetch data immediately

    // Function to update time and data
    const updateTimeAndData = () => {
      const date = new Date();
      setCurrentTime(destructureDate(date));

      // Fetch data every minute
      if (date.getSeconds() === 0) {
        fetchData()
          .then((res) => {
            setData(res);
          })
          .catch((error) => console.error(error));
      }
    };

    // Set an interval to update data every second
    const timerID = setInterval(updateTimeAndData, 1000);

    return () => clearInterval(timerID);
  }, []);

  if (loading) return <Loader />; // Show loader while loading

  if (!data) return null; // Ensure the component returns null when there is no data

  return (
    <div className="app">
      <div className="featured-data">
        <Components.FeaturedData city={city} />
      </div>

      <div className="temperature-display">
        <Components.WeatherIcon
          wi={data.weatherCode?.image}
          wd={data.weatherCode?.description}
        />
      </div>
      <div className="main-data">
        <Components.MainData
          temperature={data.temperature}
          apparentTemperature={data.apparentTemperature}
        />
      </div>
      <div className="time-data">
        <Components.TimeData time={currentTime} />
      </div>
      <div className="forecast">
        <Components.Forecast forecast={data.hourlyData} />
      </div>
    </div>
  );
}

export default App;
