window.addEventListener('load', () => {
    let long; // longitude
    let lat; // latitude
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let iconCurrent = document.querySelector('.location img');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `http://api.weatherstack.com/current?access_key=99434eeab1ec44f69e183ed7ffa630f5&query=${lat}, ${long}`;

            fetch(api)
                .then(respone => {
                    return respone.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, weather_descriptions, weather_icons } = data.current;
                    
                    // set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = weather_descriptions;
                    locationTimezone.textContent = data.location.timezone_id;
                    iconCurrent.setAttribute('src', weather_icons);

                    let celsius = (temperature - 32) * (5 / 9); 
                    // Change temperature to C/F
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'C') {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                        else {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }
})