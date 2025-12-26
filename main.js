const api_key = "99cf043920f63cfbf2a1e36d1faaee17";
let info_1 = document.getElementById("temperature"),
  pressure = document.getElementById("pressure"),
  info_3 = document.getElementById("humidity"),
  feels_like = document.getElementById("feelsLike"),
  currentdate = document.getElementById("currentDate"),
  currenttime = document.getElementById("currentTime"),
  info_5 = document.getElementById("windSpeed"),
  info_7 = document.getElementById("cityName"),
  sunrise = document.getElementById("sunrise"),
  sunset = document.getElementById("sunset"),
  info_8 = document.getElementById("weatherDescription"),
  info_9 = document.getElementById("weatherIcon");

function find_my_coordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        // for air quality index
        fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${api_key}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const aqiValue = data.list[0].main.aqi;
            const aqiLabel = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][
              aqiValue - 1
            ];

            document.getElementById("aqiValue").innerText = aqiValue;
            document.getElementById("aqiLabel").innerText = aqiLabel;
            document.getElementById("aqiBar").style.width = aqiValue * 20 + "%";
          });
        // for UV index
        fetch(
          `https://currentuvindex.com/api/v1/uvi?latitude=${latitude}&longitude=${longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.ok) {
              const uvIndex = data.now.uvi;
              let uvLabel = "";

              // Optional: add UV risk category
              if (uvIndex <= 2) uvLabel = "Low";
              else if (uvIndex <= 5) uvLabel = "Moderate";
              else if (uvIndex <= 7) uvLabel = "High";
              else if (uvIndex <= 10) uvLabel = "Very High";
              else uvLabel = "Extreme";

              // Display on page
              document.getElementById("uvValue").innerText = uvIndex;
              document.getElementById("uvLabel").innerText = uvLabel;
            } else {
              console.error("UV API returned error:", data);
            }
          })
          .catch((err) => console.error("Failed to fetch UV index:", err));
        // for weather data
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            info_1.innerText = data.main.temp + "°";
            pressure.innerText = data.main.pressure;
            feels_like.innerText = data.main.feels_like + "°C";
            info_3.innerText = data.main.humidity + "%";
            info_5.innerText = data.wind.speed + "km/h";

            //its for sunrise and sunset time conversion from unix to normal time
            const sunriseDate = new Date(data.sys.sunrise * 1000);
            const sunsetDate = new Date(data.sys.sunset * 1000);
            const sunriseTime = sunriseDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });
            const sunsetTime = sunsetDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });
            sunrise.innerText = sunriseTime;
            sunset.innerText = sunsetTime;

            //for city name and country
            const regionNames = new Intl.DisplayNames(["en"], {
              type: "region",
            });
            info_7.innerText =
              regionNames.of(data.sys.country) + ", " + data.name;

            //description
            info_8.innerText = data.weather[0].description;

            //icon
            info_9.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            // for time
            const now = new Date();
            const currentTime = now.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });
            const currentDate = now.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            currentdate.innerText = currentDate;
            currenttime.innerText = currentTime;
          });
      },
      (err) => {
        alert(err.message);
      }
    );
  } else {
    alert("access denied");
  }
}

find_my_coordinates();

// search
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherByCity(city);
  }
});

function fetchWeatherByCity(city) {
  // to getlonhitude and longitude
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        // uv index
        fetch(
          `https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.ok) {
              const uvIndex = data.now.uvi;
              let uvLabel = "";

              // Optional: add UV risk category
              if (uvIndex <= 2) uvLabel = "Low";
              else if (uvIndex <= 5) uvLabel = "Moderate";
              else if (uvIndex <= 7) uvLabel = "High";
              else if (uvIndex <= 10) uvLabel = "Very High";
              else uvLabel = "Extreme";

              // Display on page
              document.getElementById("uvValue").innerText = uvIndex;
              document.getElementById("uvLabel").innerText = uvLabel;
            } else {
              console.error("UV API returned error:", data);
            }
          })
          .catch((err) => console.error("Failed to fetch UV index:", err));

        //for air quality index
        fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`
        )
          .then((res) => res.json())
          .then((aqiData) => {
            const aqiValue = aqiData.list[0].main.aqi;
            const aqiLabel = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][
              aqiValue - 1
            ];
            document.getElementById("aqiValue").innerText = aqiValue;
            document.getElementById("aqiLabel").innerText = aqiLabel;
            document.getElementById("aqiBar").style.width = aqiValue * 20 + "%";
          });
      } else {
        alert("City not found!");
      }
    });
  // for weather data
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        info_1.innerText = data.main.temp + "°";
        pressure.innerText = data.main.pressure;
        feels_like.innerText = data.main.feels_like + "°C";
        info_3.innerText = data.main.humidity + "%";
        info_5.innerText = data.wind.speed + "km/h";

        //for city name and country
        const regionNames = new Intl.DisplayNames(["en"], {
          type: "region",
        });
        info_7.innerText = regionNames.of(data.sys.country) + ", " + data.name;

        //description
        info_8.innerText = data.weather[0].description;

        //icon
        info_9.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // for time
        const timezoneOffset = data.timezone;

        const formatTime = (unix, offset) => {
          const d = new Date((unix + offset) * 1000);
          return d.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
          });
        };

        sunrise.innerText = formatTime(data.sys.sunrise, timezoneOffset);
        sunset.innerText = formatTime(data.sys.sunset, timezoneOffset);
        const now = new Date();
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
        const cityTime = new Date(utcTime + timezoneOffset * 1000);

        currenttime.innerText = cityTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        currentdate.innerText = cityTime.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      } else {
        alert("City not found!");
      }
    });
}
