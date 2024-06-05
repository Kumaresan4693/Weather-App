import React, { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import cloud from "./cloud.mp4";
import haze from "./haze.mp4";
import rain from "./rain.mp4";
import clear from "./clear.mp4";
import mist from "./mist.mp4";
function Demo() {
  const [climate, setClimate] = useState("bg");
  const [city, setCity] = useState("chennai");
  const [apiData, setData] = useState(null);
  useEffect(() => {
    console.log(city);
    let apiCall = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c268b2eb57ad3aa64a0edd3006ad828`
    );
    let data = apiCall.then((item) => item.json());
    data.then(
      (value) => {
        setData(value);
        setClimate(value["weather"]["0"]["main"]);

        console.log(value);
      }

      // console.log(value["wind"]["speed"]);
      // console.log(value["main"]["humidity"]);
      // document.getElementById("city").innerText = value["name"];
      // document.getElementById("wind").innerText = value["wind"]["speed"];
      // document.getElementById("humidity").innerText = value["main"]["humidity"];
    );
  }, [city]);

  function check() {
    var area = document.getElementById("input").value;
    setCity(area);
    // console.log(area);
  }
  // console.log(climate);
  // console.log(apiData);
  return (
    <>
      <div className="overall">
        <div className={climate === "Clouds" ? "block" : "vid"}>
          <video src={cloud} autoPlay muted loop></video>
        </div>

        <div className={climate === "Haze" ? "block" : "vid"}>
          <video src={haze} autoPlay muted loop></video>
        </div>
        {console.log(climate)}
        <div className={climate === "Rain" ? "block" : "vid"}>
          <video src={rain} autoPlay muted loop></video>
        </div>

        <div className={climate === "Clear" ? "block" : "vid"}>
          <video src={clear} autoPlay muted loop></video>
        </div>

        <div className={climate === "Mist" ? "block" : "vid"}>
          <video src={mist} autoPlay muted loop></video>
        </div>

        <div className="card">
          <h1>Weather App</h1>
          <div className="wrap">
            <input id="input" type="text" placeholder="Enter your city name" />
            <span className="icon">
              <label htmlFor="click">
                <FcSearch />
              </label>
              <input type="submit" id="click" onClick={check} />
            </span>
          </div>

          <h1 id="city">{apiData?.name}</h1>
          <h1>
            <span>
              <FaCloudShowersHeavy />
            </span>{" "}
            <span id="climate"> {apiData?.weather[0].main}</span>
          </h1>
          <div className="box">
            <div className="sec1">
              <p>Humidity</p>
              <span>
                <WiHumidity />
              </span>
              <span id="humidity">{apiData?.main.humidity}</span>
            </div>

            <div className="sec1">
              <p>Wind Speed</p>
              <span>
                <FaWind />
              </span>
              <span id="wind"> {apiData?.wind.speed}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
