"use strict";

const titleCity = document.querySelector(".title-text-city");
const titleDate = document.querySelector(".title-text-date");
const titleTemp = document.querySelector(".title-text-temp");
const titleWeather = document.querySelector(".title-text-weather");
const titlePressure = document.querySelector(".title-text-pressure");
const titleVisibility = document.querySelector(".title-text-visibility");
const bodyTimes = document.querySelectorAll(".body_date");
const titleImg = document.querySelector(".title-img");
const itemTemps = document.querySelectorAll(".item_temp");
const bodyImgs = document.querySelectorAll(".body_img");

// display API data
const displayUI = (data) => {
  console.log(data);
  //city name
  titleCity.textContent = `${data.city.name}`;
  //current date
  let now = new Date();
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  };
  titleDate.textContent = new Intl.DateTimeFormat("sv", options).format(now);
  //current temp
  titleTemp.innerHTML = `${Math.round(
    data.list[0].main.temp - 273.15
  )} <span>&degC</span>`;
  //current weather
  titleWeather.textContent = `Weather: ${data.list[0].weather[0].main}`;
  //current pressure
  titlePressure.textContent = `Pressure: ${data.list[0].main.pressure}`;
  //current visibility
  titleVisibility.textContent = `Visibility: ${data.list[0].visibility}`;

  //update title img
  data.list.forEach((el) => {
    if (el.weather[0].main === "Rain") {
      titleImg.src = "img/rain.png";
    } else if (el.weather[0].main === "Clouds") {
      titleImg.src = "img/cloud.png";
    } else if (el.weather[0].main === "Snow") {
      titleImg.src = "img/snowflake.png";
    } else if (el.weather[0].main === "Sun") {
      titleImg.src = "img/sun.png";
    } else if (el.weather[0].main === "Extreme") {
      titleImg.src = "img/thunderstorm.png";
    } else {
      titleImg.src = "img/cloudy.png";
    }
  });

  //update body img
  for (let i = 0; i < data.list.slice(1, 5).length; i++) {
    if (data.list.slice(1, 5)[i].weather[0].main === "Rain") {
      bodyImgs[i].src = "img/rain.png";
    } else if (data.list.slice(1, 5)[i].weather[0].main === "Clouds") {
      bodyImgs[i].src = "img/cloud.png";
    } else if (data.list.slice(1, 5)[i].weather[0].main === "Snow") {
      bodyImgs[i].src = "img/snowflake.png";
    } else if (data.list.slice(1, 5)[i].weather[0].main === "Sun") {
      bodyImgs[i].src = "img/sun.png";
    } else if (data.list.slice(1, 5)[i].weather[0].main === "Extreme") {
      bodyImgs[i].src = "img/thunderstorm.png";
    } else {
      bodyImgs[i].src = "img/cloudy.png";
    }
  }

  let time = data.list[0].dt_txt.slice(11, 16);
  console.log(time);

  //body time
  let list = data.list.slice(1, 5);
  console.log(list);
  for (let i = 0; i < list.length; i++) {
    bodyTimes[i].textContent = list[i].dt_txt.slice(11, 16);

    //console.log(itemTemps[i]);

    itemTemps[i].innerHTML = `${Math.round(
      list[i].main.temp - 273.15
    )}<span>&degC</span> `;
  }
};

//get API data

const getData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const apiKey = "a75daf755cc544679e1d32a640255326";
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    getData(url).then((data) => {
      displayUI(data);
    });
  });
