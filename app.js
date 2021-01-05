window.addEventListener('load',() => {
    let long;
    let lat;
    let iconCode;
    const apiBaseURL = "http://api.openweathermap.org/data/2.5/weather";
    const iconBaseURL = "http://openweathermap.org/img/wn/";

    const cityName = document.getElementById("city");
    const temperatureDegree = document.getElementById("degree");
    const temperatureDescription = document.getElementById("desc");
    const image = document.getElementById("icon");
    const unit = document.getElementById("c");

    fetch("./key.json").then(resp => {return resp.json()})
        .then(keydata => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    long = position.coords.longitude;
                    lat = position.coords.latitude;
                    console.log(lat);
                    console.log(long);
        
                    const apiCall = apiBaseURL + "?lat=" + lat + "&lon=" + long + "&appid=" + keydata.apiKey;
        
                    fetch(apiCall).then((data) => {
                        return data.json();
                    }).then((resp) => {
                        console.log(resp);
                        const countryCode = resp.sys.country;
                        const temperature = resp.main.temp;
                        const description = resp.weather[0].description;
                        const city = resp.name;
                        iconCode = resp.weather[0].icon;
                        setImage(iconCode);
                        
                        // DOM Manipulation
                        cityName.textContent = city +", "+countryCode;
                        temperatureDegree.textContent = (temperature - 273.15).toFixed(0);
                        temperatureDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1);
                        unit.textContent = "C";
                    }).catch((error) => {
                        alert(error.message);
                    });
                });
            } else {
                alert("ERROR");
            }
    });

    function setImage(iconCode) {
        const call = iconBaseURL + iconCode + "@2x.png";
        fetch(call).then((resp) => resp.blob()).then((img) => {
            console.log(img);
            url = URL.createObjectURL(img);
            console.log(url);
            image.src = url;
        });
    }
});