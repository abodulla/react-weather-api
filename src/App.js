import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=33def6fe6f7f8d190816e7de0b9b5430&units=metric`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(
          "Failed to fetch data. Please check the location or try again later."
        );
      } finally {
        setLoading(false);
      }
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="container">
        {!error && !loading && (
          <>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>

            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main ? (
                    <>
                      <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                      <p>Feels Like</p>
                    </>
                  ) : null}
                </div>
                <div className="humidity">
                  {data.main ? (
                    <>
                      <p className="bold">{data.main.humidity}%</p>
                      <p>Humidity</p>
                    </>
                  ) : null}
                </div>
                <div className="wind">
                  {data.wind ? (
                    <>
                      <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                      <p>Wind Speed</p>
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
