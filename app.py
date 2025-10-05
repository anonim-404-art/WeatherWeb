from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)
app.secret_key = "wiycbuyv73hf893r83t8h3580gh30hg083ghb835h"


@app.route('/')
def index():
    time = datetime.today()
    hour = time.hour
    minute = time.minute
    day = time.day
    weekday = time.strftime("%A")
    month = time.strftime("%b")
    year = time.year
    return render_template("index.html", hour=hour, minute=minute, day=day, weekday=weekday, month=month, year=year)



if __name__ == '__main__':
    app.run()
