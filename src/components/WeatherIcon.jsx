import "../styles/components/styles.css";

export function WeatherIcon({wi,wd}) {
  return (
    <div className={`weather-icon-container`}>
      <img src={wi} alt="" className="weather-icon" />
      <h3 className="weather-icon-description">{wd}</h3>
    </div>
  );
}
