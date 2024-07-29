import React from 'react';
import { ForecastItem } from './components.jsx'; // Asigură-te că importi corect ForecastItem

export function Forecast({ forecast = [] }) {
  // Obține ora curentă și calculează ora următoare fixă
  const now = new Date();
  const nextHour = new Date(now.getTime() + (60 - now.getMinutes()) * 60000);
  nextHour.setSeconds(0); // Setează secundele la 0
  nextHour.setMilliseconds(0); // Setează milisecundele la 0

  // Formatează ora următoare în format HH:mm
  const nextHourString = `${nextHour.getHours()}:${("0" + nextHour.getMinutes()).slice(-2)}`;

  // Filtrează forecast-ul pentru a începe de la următoarea oră fixă
  const filteredForecast = forecast.filter(item => {
    const itemDate = new Date(item.time.year, item.time.month - 1, item.time.day, item.time.hour, item.time.minute);
    return itemDate >= nextHour;
  });

  return (
    <div className="forecast">
      <h1 className="title">Day's Forecast</h1>
      <div className="forecast-list">
        {filteredForecast.map((forecast_item, index) => (
          <ForecastItem key={index} item={forecast_item} />
        ))}
      </div>
    </div>
  );
}
