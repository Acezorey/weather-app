const apiKey = openweathermap api goes here;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

//Weather checking function
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    //Error catching
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        let data = await response.json();

        console.log(data); //<- For production purposes

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch(data.weather[0].main){
            case "Clouds": weatherIcon.src = "../images/cloudy.png"; break;
            case "Clear": weatherIcon.src = "../images/clear.png"; break;
            case "Rain": weatherIcon.src = "../images/rain.png"; break;
            case "Drizzle": weatherIcon.src = "../images/drizzle.png"; break;
            case "Mist": weatherIcon.src = "../images/mist.png"; break;
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}


searchBtn.addEventListener("click", () => {
    if(searchBox.value != null){
        checkWeather(searchBox.value);
    }
});