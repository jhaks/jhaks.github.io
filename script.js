var city;

function getCityName(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      // Use a reverse geocoding service to get the city name
      var geocodingApiUrl = `https://geocode.xyz/${latitude},${longitude}?json=1&auth=606223008462681547375x24246'`;

      fetch(geocodingApiUrl)
        .then(response => response.json())
        .then(data => {
          ddt = data;
          if (data.city) {
            city = data.alt.loc[1].city;
            if (callback && typeof callback === 'function') {
              callback(city);
            }
          } else {
            console.error('City information not available.');
            if (callback && typeof callback === 'function') {
              callback(undefined); // Pass undefined to indicate an error
            }
          }
        })
        .catch(error => {
          console.error('Error fetching geocoding data:', error);
          if (callback && typeof callback === 'function') {
            callback(undefined); // Pass undefined to indicate an error
          }
        });
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
    if (callback && typeof callback === 'function') {
      callback(undefined); // Pass undefined to indicate an error
    }
  }
}

// Call the function with a callback
getCityName(function (city) {
  if (city !== undefined) {
    console.log('City: ' + city);

    // Now that we have the city, fetch weather information
    const apiKey = 'b530bb7a2ce04284b6263840232812';
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2&aqi=no&alerts=no`;
    const currentDate = document.getElementById('curr_date');
    const currentDay = document.getElementById('curr_day');
    const currentTemp = document.getElementById('curr_temp');
    const currentLow = document.getElementById('curr_low');
    const currentHigh = document.getElementById('curr_hig');
    const nextLow = document.getElementById('next_low');
    const nextHigh = document.getElementById('next_hig');
    const currentRise = document.getElementById('curr_rise');
    const currentSet = document.getElementById('curr_set');
    const moonRise = document.getElementById('moon_rise');
    const moonSet = document.getElementById('moon_set');
    const disc = document.getElementById('curr_disc');
    const cname = document.getElementById('weather_output');
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
         dat = data;
        const temperature = dat.current.temp_c;
        const cdate = dat.forecast.forecastday[0].date;
        // const cday = dat.current.day;
        const clow = dat.forecast.forecastday[0].day.mintemp_c;
        const chig = dat.forecast.forecastday[0].day.maxtemp_c;
        const dlow = dat.forecast.forecastday[1].day.mintemp_c;
        const dhig = dat.forecast.forecastday[1].day.maxtemp_c;
        const description = dat.forecast.forecastday[0].day.condition.text;
        const crise = dat.forecast.forecastday[0].astro.sunrise;
        const cset = dat.forecast.forecastday[0].astro.sunset;
        const mrise = dat.forecast.forecastday[0].astro.moonrise;
        const mset = dat.forecast.forecastday[0].astro.moonset;
        // const location = dat.location.name;
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(cdate);
    var cday = days[d.getDay()];
        currentDate.innerHTML = `${cdate}`;
        currentDay.innerHTML = cday;
        currentDate.innerHTML = cdate;
        disc.innerHTML = description;
        currentTemp.innerHTML = temperature;
        currentLow.innerHTML = clow;
        currentHigh.innerHTML = chig;
        nextLow.innerHTML = dlow;
        nextHigh.innerHTML = dhig;
        currentRise.innerHTML = crise;
        currentSet.innerHTML = cset;
      moonRise.innerHTML = mrise;
      moonSet.innerHTML = mset;
      cname.innerHTML = dat.location.name + "/" + dat.location.region;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  } else {
    console.error('Failed to retrieve city information.');
  }
});
