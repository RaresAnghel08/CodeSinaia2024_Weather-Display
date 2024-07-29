import weather_codes from "../data/weather_codes.json";

export function getWeatherCodeData(weather_code, isNight) {
  if (!(weather_code in weather_codes))
    return {
      code: weather_code,
      image: "",
      description: `Weather code ${weather_code} was not found`,
    };

  let weather_obj = isNight ? weather_codes[weather_code]["night"] : weather_codes[weather_code]["day"];

  weather_obj["code"] = weather_code;

  return weather_obj;
}
