import { fetchWeatherApi } from "openmeteo";
import { destructureDate, isNight } from "./time_data";
import { getWeatherCodeData } from "./weather_codes";

export async function fetchData() {
  const params = {
    latitude: 45.474998,
    longitude: 25.251944,
    current: ["temperature_2m", "apparent_temperature", "is_day", "weather_code"],
    hourly: ["temperature_2m", "apparent_temperature", "weather_code"],
    forecast_days: 1,
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];
  const current = response.current();
  const hourly = response.hourly();

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const hourly_data = {
    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
      (t) => new Date((t + utcOffsetSeconds) * 1000)
    ),
    temperature: hourly.variables(0).valuesArray(),
    apparentTemperature: hourly.variables(1).valuesArray(),
    weatherCode: hourly.variables(2).valuesArray(),
  };

  const hours_data = [];

  for (let i = 0; i < hourly_data.temperature.length; i++) {
    hours_data.push({
      time: destructureDate(hourly_data.time[i]),
      temperature: Math.floor(hourly_data.temperature[i]),
      apparentTemperature: Math.floor(hourly_data.apparentTemperature[i]),
      weatherCode: getWeatherCodeData(hourly_data.weatherCode[i], isNight(hourly_data.time[i])),
    });
  }

  const weather = {
    temperature: Math.floor(current.variables(0).value()),
    apparentTemperature: Math.floor(current.variables(1).value()),
    isNight: !current.variables(2).value(),
    weatherCode: getWeatherCodeData(current.variables(3).value(), !current.variables(2).value()),
    hourlyData: hours_data,
  };

  return weather;
}
