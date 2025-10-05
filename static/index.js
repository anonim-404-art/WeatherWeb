function find_my_coordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude
            fetch("http://127.0.0.1:5000/api/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({lat: latitude, long: longitude})
            })

        }, (err) => {
            alert(err.message)
        })
    } else {
        alert("access denied")
    }
}
find_my_coordinates()