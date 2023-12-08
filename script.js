'use strict'
const apiKey = "5d8e390a75084c069a8144644230712";
const today = new Date();
const dateWeekDayLong = today.toLocaleDateString("en-EN", { weekday: "long" });
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const date = new Date();
const ulDays = document.querySelectorAll(".ul-day");
ulDays.forEach((element, index) => {
  const dayIndex = (date.getDay() + index) % 7;
  element.innerText = daysOfWeek[dayIndex];
});
const parentDiv = document.querySelector('.parent-div');
const searchForm = document.querySelector('.search-form');
const secondBTNSubmit = document.querySelector('.submit-btn');
const firstBTNSearch = document.querySelector('.search-btn');
const form = document.querySelector('form');
const inputForm = document.querySelector('.input-form')
parentDiv.style.display = 'none'
searchForm.style.display = 'block'

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const searchValue = searchForm.querySelector('input').value;

    if(searchValue === '')
    return ;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchValue}&days=4&aqi=yes&alerts=no`;
    const json = await fetch(url).then((res) => res.json());

    console.log(json);
if(json.forecast && json.forecast.forecastday){
    searchForm.style.display = 'none'
    parentDiv.style.display = 'flex'

    const weekDay = document.querySelector(".weekday");
    const date = document.querySelector(".date h2");
    const location = document.querySelector(".location h2");
    const celsius = document.querySelector(".celsius");
    const conditionJS = document.querySelector(".condition");
    const conditionImg = document.querySelector(".info-img");
    const precipitation = document.getElementById("prec");
    const humidity = document.getElementById("humi");
    const windSpeed = document.getElementById("wisp");
    const temp = document.querySelectorAll(".temp");
    const ulIMG = document.querySelectorAll(".ul-img");

    const liTempNulUpdate = function () {
      temp.forEach((element, index) => {
        if (index === 0) {
          return (element.innerText = `${json.current.temp_c} °C`);
        }
        if (json.forecast.forecastday[index]) {
          element.innerText = `${json.forecast.forecastday[index].day.avgtemp_c} °C`;
        }
      });

      ulIMG.forEach((element, index) => {
        if (json.forecast.forecastday[index]) {
          element.src = `${json.forecast.forecastday[index].day.condition.icon}`;
        }
      });
    };

    weekDay.innerText = `${dateWeekDayLong}`;

    if (json.forecast.forecastday[0] && json.forecast.forecastday[0].date) {
      date.innerText = `${json.forecast.forecastday[0].date}`;
    }

    location.innerText = `${json.location.name}, ${json.location.country}`;

    celsius.innerText = `${json.current.temp_c} °C`;

    conditionJS.innerText = `${json.current.condition.text}`;

    conditionImg.src = `${json.current.condition.icon}`;

    precipitation.innerText = `${json.current.uv}`;

    humidity.innerText = `${json.current.humidity}`;

    windSpeed.innerText = `${json.current.wind_kph} km/h`;

    liTempNulUpdate();
  }else{
    searchForm.style.display = 'block'
    parentDiv.style.display = 'none'
    alert("Wrong Input")
    inputForm.value = ''
  }
  } catch (err) {
    console.error(err);
  }
});


firstBTNSearch.addEventListener('click',() =>{
  window.location.reload()

})
