import "../styles/components/styles.css";

export function FeaturedData({city = "Bucuresti"}) {
    return (
    <div className="featured-data">
        <h1 className="city">{city}</h1>
    </div>
    );
}
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
export function ForecastItem({ item }) {
    const temperatureClass = item.temperature < 14 ? "cold-temperature" : "normal-temperature";

    return (
    <div className="forecast-item">
        <img
        src={item.weatherCode.image}
        alt={item.weatherCode.description}
        className="forecast-icon"
        />
        <h1 className={`title ${temperatureClass}`}>{item.temperature}°C</h1>
        <p>
        {item.time.hour}:{item.time.minute}
        </p>
    </div>
    );
}

export function MainData({temperature,apparentTemperature}) {
    return (
        <div className="main-data">
        <h1 className="title">Temperature Data</h1>
        <div className="data">
            <h2 className="temperature">Temperature: {temperature}°C</h2>
            <h3 className="apparent_temperature">Apparent Temperature: {apparentTemperature}°C</h3>
        </div>
        </div>
    );
    }
    export function TimeData({time}) {
      return (
        <div className="time-data">
          <h2 className="title">Date & Time</h2>
          <div className="sections">
            <div className="section">
                <h3 className="section-title">Date</h3>
              <p className="date">{time.day}-{time.month}-{time.year}</p>
            </div>
            <div className="section">
              <h3 className="section-title">Time</h3>
              <p className="time">{time.hour}:{time.minute}:{time.second}</p>
            </div>
          </div>
        </div>
      );
    }
    export function WeatherIcon({wi,wd}) {
        return (
          <div className={`weather-icon-container`}>
            <img src={wi} alt="" className="weather-icon" />
            <h3 className="weather-icon-description">{wd}</h3>
          </div>
        );
      }
      