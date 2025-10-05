const api_key = "99cf043920f63cfbf2a1e36d1faaee17"
let info_1 = document.getElementById("1"),
    info_2 = document.getElementById("2"),
    info_3 = document.getElementById("3"),
    info_4 = document.getElementById("4"),
    info_5 = document.getElementById("5"),
    info_6 = document.getElementById("6"),
    info_7 = document.getElementById("7"),
    info_8 = document.getElementById("8"),
    info_9 = document.getElementById("9"),
    main = document.querySelector(".main")

const vocab = {
    "Clear": "https://wallpaperbat.com/img/307824-sunny-day-wallpaper.jpg",
    "Clouds": "https://images.unsplash.com/photo-1495756111155-45cb19b8aeee?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdWQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
    "Rain": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoF9f8Y4lwQeOnLijmMajma9CtCkOEs7MgSA&s",
    "Snow": "https://iso.500px.com/wp-content/uploads/2024/11/ALASKA-ALONG-DALTON-HIGHWAY-70714-By-Raimondo-Restelli-2-3000x1688.jpeg",
    "Thunderstorm": "https://plus.unsplash.com/premium_photo-1726818265070-c08eb719d77c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGh1bmRlcnN0b3JtfGVufDB8fDB8fHww",
    "Drizzle": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY-bIdVv3onkhOxYAA4fbkRD1w0_0z9v4FqA&s",
    "Mist": "https://plus.unsplash.com/premium_photo-1669613233557-1676c121fe73?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9nfGVufDB8fDB8fHww",
    "Fog": "https://cloudfront-us-east-1.images.arcpublishing.com/gray/JFDZ7U577FFBTCTSLUKDQDSAYQ.png",
    "Haze": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3dTasTdahWrcFl7JGWJMA_pQhh8gF1QNUmw&s",
    "Smoke": "https://cdn.pixabay.com/video/2024/02/08/199788-911378451_tiny.jpg",
    "Squall": "https://plus.unsplash.com/premium_photo-1673278171570-18af2a6ece31?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWR5JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D",
    "Tornado": "https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?cs=srgb&dl=pexels-ralph-w-lambrecht-642090-1446076.jpg&fm=jpg",
    "Dust": "https://images.stockcake.com/public/3/a/9/3a9a41b5-a22f-4ae4-adf9-3b9404bab049_large/desert-dust-storm-stockcake.jpg",
    "Ash": "https://freerangestock.com/sample/170722/eruption-with-ash-cloud-against-darkening-sky.jpg"
}

function find_my_coordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    info_1.innerText = data.main.temp_max
                    info_2.innerText = data.main.temp_min
                    info_3.innerText = data.main.humidity + "%"
                    info_4.innerText = data.clouds.all + "%"
                    info_5.innerText = data.wind.speed + 'km/h'
                    info_6.innerText = data.main.temp + 'C'
                    info_7.innerText = data.sys.country
                    info_8.innerText = data.weather[0].description
                    info_9.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                    main.style.backgroundImage = `url("${vocab[data.weather[0].main]}")`

                    console.log("Fetched data:", data);
                })
        }, (err) => {
            alert(err.message)
        })
    } else {
        alert("access denied")
    }
}

find_my_coordinates()