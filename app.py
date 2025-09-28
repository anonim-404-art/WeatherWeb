from flask import Flask, render_template, jsonify, request, session
from datetime import datetime
import requests

app = Flask(__name__)
app.secret_key = "wiycbuyv73hf893r83t8h3580gh30hg083ghb835h"

api_key = "99cf043920f63cfbf2a1e36d1faaee17"
lat = 61
lon = 1


def weather(api_key, lat, long):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&appid={api_key}&units=metric"
    response = requests.get(url).json()
    return response


@app.route('/', methods=["POST", "GET"])
def index():
    current_lat = lat
    current_lon = lon

    if request.method == "POST":
        location = request.get_json()
        if location and 'lat' in location and 'long' in location:
            current_lat = location['lat']
            current_lon = location['long']
    response = weather(api_key, current_lat, current_lon)  # kuproq malumot uchun print qilish kerek
    print(response)
    main = response.get("main", {})
    sys = response.get("sys", {})
    weather_info = response.get("weather", {})
    wind = response.get("wind", {})
    clouds = response.get("clouds", {})

    temp = main["temp"]
    country = sys["country"]
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
    return render_template("index.html", country=country, temp=temp, cloud=cloud, wind_speed=wind_speed,
                           temp_max=temp_max,
                           temp_min=temp_min, humidity=humidity, hour=hour, minute=minute, day=day, weekday=weekday,
                           month=month, year=year)


if __name__ == '__main__':
    app.run()
