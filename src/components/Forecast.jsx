import "../styles/components/styles.css";
import { ForecastItem } from "./ForecastItem";

export function Forecast({ forecast = [] }) {
  return (
    <div className={`forecast `}>
      <h1 className="title">Day's Forecast</h1>
      <div className="forecast-list">
        {forecast.map((forecast_item, index) => (
          <ForecastItem key={index} item={forecast_item} />
        ))}
      </div>
    </div>
  );
}