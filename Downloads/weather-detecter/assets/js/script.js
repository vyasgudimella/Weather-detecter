var weather_body = document.getElementById('weather-body');
var loader = document.getElementById('loader');
var locationDetails = document.getElementById('details')
var weatherStatus = document.getElementById('status')

var city = document.getElementById('city');
var date = document.getElementById('date');
var temp = document.getElementById('temp');
var minMax = document.getElementById('min-max');
var weather = document.getElementById('weather');
var curr_date = document.getElementById('date')

var search = document.getElementById('search');
var weatherApi = {
    key: '4009879e306f7ff474b7fe13920c728e',
    url: 'https://api.openweathermap.org/data/2.5/weather?'
}
// var key = '4009879e306f7ff474b7fe13920c728e' ;
search.addEventListener('keypress', (e) => {

    if (e.keyCode == 13) {              //13 =enter press
        weather_body.style.display = "block";
        console.log(search.value)

        //Instantiate and XHR Object
        const xhr = new XMLHttpRequest();

        // open the object
        xhr.open('GET', `${weatherApi.url}q=${search.value}&appid=${weatherApi.key}&units=metric`, true);

        // show Loading... when data is fetching
        xhr.onloadstart = function () {
            loader.style.display = 'block';
            locationDetails.style.display = "none";
            weatherStatus.style.display = 'none';
        }

        // after fetching hide loading..
        xhr.onloadend = function () {
            loader.style.display = 'none';
            locationDetails.style.display = "block";
            weatherStatus.style.display = 'block';
        }

        xhr.onload = function () {
            let weatherData = JSON.parse(this.responseText)
            console.log(weatherData);

            try {
                city.innerHTML = `${weatherData.name} (${weatherData.sys.country})`;

                temp.innerHTML = `${Math.round(weatherData.main.temp)}&deg; C`;

                minMax.innerHTML = ` ${Math.floor(weatherData.main.temp_min)}&deg; C (min) / ${Math.ceil(weatherData.main.temp_max)}&deg; C (max)`;

                weather.innerHTML = `${weatherData.weather[0].main}`
                //call date fun
                dateManage();
            } catch (e) {
                alert('Enter city name properly or Enter another city Name')
            }

            //change background as per weather
            if (weather.innerHTML == 'Clouds') {
                document.body.style.backgroundImage = "url('assets/images/cloud.jpg')";
            } else if ((weather.innerHTML == 'Haze') || (weather.innerHTML == 'Clear')) {
                document.body.style.backgroundImage = "url('assets/images/sun.jpg')";
            } else if (weather.innerHTML == 'Rain') {
                document.body.style.backgroundImage = "url('assets/images/rainy.jpg')";
            } else if (weather.innerHTML == 'Snow') {
                document.body.style.backgroundImage = "url('assets/images/snow.png')";
            } else if (weather.innerHTML == 'Thunderstorm') {
                document.body.style.backgroundImage = "url('assets/images/Thunderstorm.jpg')";
            }
        }

        // send the request
        xhr.send();
    }
});

// show current day info
function dateManage() {
    var date = new Date();

    var currDate = date.getUTCDate();
    var currMonth = date.getUTCMonth();
    var currDay = date.getUTCDay();
    var currYear = date.getUTCFullYear();

    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var day;
    day = days[currDay - 1];
    // console.log(day);

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month;
    month = months[currMonth];
    // console.log(month);

    curr_date.innerHTML = `${currDate} ${month} (${day}), ${currYear}`

}