import "./App.css";
import { fetchData } from "./utilities/fetchData";
import { useState, useEffect } from "react";
import { destructureDate } from "./utilities/time_data";
import * as Components from "./components/components.jsx";

function App() {
  const [data, setData] = useState();

  function updateDate(date) {
    setData((previousData) => ({ ...previousData, time: date }));
  }

  useEffect(() => {
    let timerID = setInterval(() => {
      const date = destructureDate(new Date());

      updateDate(date);

      if (date.minute % 30 === 0 && parseInt(date.second, 10) === 0) {
        fetchData()
          .then((res) => {
            setData(res);
          })
          .catch((error) => console.error(error));
      }
    }, 1000);
    fetchData()
      .then((res) => {
        setData({ ...res, time: destructureDate(new Date()) });
      })
      .catch((error) => console.error(error));

    return () => clearInterval(timerID);
  }, []);

  if (!data) return null;

  return (
    <div className="app">
      <div className="featured-data">
        <Components.FeaturedData city="Sinaia" />
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
        <Components.TimeData time={data.time} />
      </div>
      <div className="forecast">
        <Components.Forecast forecast={data.hourlyData} />
      </div>
    </div>
  );
}

export default App;
