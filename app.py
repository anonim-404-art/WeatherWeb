from flask import Flask, render_template
from datetime import datetime
import math
import requests
from tkinter import *

app = Flask(__name__)

lat = 41.31
lon = 69.28
api_key = "99cf043920f63cfbf2a1e36d1faaee17"


def weather(api_key, lat, lon):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    response = requests.get(url).json()
    return response


# {'coord': {'lon': 69.28, 'lat': 41.31},
# 'weather': [{'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d'}],
# 'base': 'stations',
# 'main': {'temp': 28.92, 'feels_like': 27.38, 'temp_min': 28.92, 'temp_max': 28.92, 'pressure': 1019, 'humidity': 19, 'sea_level': 1019, 'grnd_level': 968},
# 'visibility': 10000,
# 'wind': {'speed': 2.37, 'deg': 312, 'gust': 1.9},
# 'clouds': {'all': 0},
# 'dt': 1759046964,
# 'sys': {'country': 'UZ', 'sunrise': 1759022171, 'sunset': 1759065053}, 'timezone': 18000, 'id': 1484839, 'name': 'Toshkent Shahri', 'cod': 200} ->example output

@app.route('/')
def index():
    response = weather(api_key, lat, lon)  # kuproq malumot uchun print qilish kerek
    main = response.get("main", {})
    weather_info = response.get("weather", {})
    wind = response.get("wind", {})
    clouds = response.get("clouds", {})

    temp = main["temp"]
    wind_speed = wind["speed"]
    temp_max = main["temp_max"]
    temp_min = main["temp_min"]
    humidity = main["humidity"]
    cloud = clouds["all"]

    time = datetime.today()
    hour = time.hour
    minute = time.minute
    day = time.day
    weekday = time.strftime("%A")
    month = time.strftime("%b")
    year = time.year
    return render_template("index.html", temp=temp, cloud=cloud, wind_speed=wind_speed, temp_max=temp_max,
                           temp_min=temp_min, humidity=humidity, hour=hour, minute=minute, day=day, weekday=weekday,
                           month=month, year=year)


if __name__ == '__main__':
    app.run()
