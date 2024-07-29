import React from 'react';
import { ForecastItem } from './components.jsx';

export function Forecast({ forecast = [] }) {
  const now = new Date();
  const nextHour = new Date(now.getTime() + (60 - now.getMinutes()) * 60000);
  nextHour.setSeconds(0);
  nextHour.setMilliseconds(0);
  const nextHourString = `${nextHour.getHours()}:${("0" + nextHour.getMinutes()).slice(-2)}`;
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
