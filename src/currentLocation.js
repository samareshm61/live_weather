import React from "react";
import apiKeys from "./apiKeys";
import Forcast from "./forcast";

import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

const formatDate = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${date} ${month} ${year}`;
};

const formatTime = (d) => {
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
    date: formatDate(new Date()), // Add date to the state and initialize it
    time: formatTime(new Date()), // Add time to the state and initialize it
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real-time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );

    // Update the time every second
    this.timeInterval = setInterval(() => {
      this.setState({ time: formatTime(new Date()) });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.timeInterval);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeather = async (lat, lon) => {
    try {
      const api_call = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );

      if (!api_call.ok) {
        throw new Error("API call failed.");
      }

      const data = await api_call.json();

      this.setState({
        lat: lat,
        lon: lon,
        city: data.name,
        temperatureC: Math.round(data.main.temp),
        temperatureF: Math.round(data.main.temp * 1.8 + 32),
        humidity: data.main.humidity,
        main: data.weather[0].main,
        country: data.sys.country,
      });

      switch (this.state.main) {
        case "Haze":
          this.setState({ icon: "CLEAR_DAY" });
          break;
        case "Clouds":
          this.setState({ icon: "CLOUDY" });
          break;
        case "Rain":
          this.setState({ icon: "RAIN" });
          break;
        case "Snow":
          this.setState({ icon: "SNOW" });
          break;
        case "Dust":
          this.setState({ icon: "WIND" });
          break;
        case "Drizzle":
          this.setState({ icon: "SLEET" });
          break;
        case "Fog":
          this.setState({ icon: "FOG" });
          break;
        case "Smoke":
          this.setState({ icon: "FOG" });
          break;
        case "Tornado":
          this.setState({ icon: "WIND" });
          break;
        default:
          this.setState({ icon: "CLEAR_DAY" });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  render() {
    if (this.state.temperatureC) {
      return (
        <React.Fragment>
          <div className="city">
            <div className="title">
              <h2>{this.state.city}</h2>
              <h3>{this.state.country}</h3>
            </div>
            <div className="mb-icon">
              <ReactAnimatedWeather
                icon={this.state.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <p>{this.state.main}</p>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div className="current-date">{this.state.date}</div>{" "}
                {/* Display date */}
              </div>
              <div className="temperature">
                <p>
                  {this.state.temperatureC}°<span>C</span>
                </p>
              </div>
            </div>
            <div className="current-time">{this.state.time}</div>{" "}
            {/* Display time */}
          </div>
          <Forcast icon={this.state.icon} weather={this.state.main} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <img
            src={loader}
            style={{ width: "50%", WebkitUserDrag: "none" }}
            alt="Loading..."
          />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location will be displayed on the App <br /> and used
            for calculating real-time weather.
          </h3>
          <div className="current-time">{this.state.time}</div>{" "}
          {/* Display time */}
        </React.Fragment>
      );
    }
  }
}

export default Weather;
