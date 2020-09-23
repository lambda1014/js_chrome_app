const weather = document.querySelector(".js-weather");
const API_KEY = "6eb1cfb2269132bca33d9402bcc8e34d";
//from OpenWeatherMap
const COORDS = "coords";

function getWeather(lat, log){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
  )
    .then(function(response){
      return response.json();
  })
    .then(function(json){
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}℃ @ ${place}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("Can't access geo location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }

}

function init(){
  loadCoords();
}

init();