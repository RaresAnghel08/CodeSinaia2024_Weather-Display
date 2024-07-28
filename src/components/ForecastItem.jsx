import "../styles/components/styles.css";

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
