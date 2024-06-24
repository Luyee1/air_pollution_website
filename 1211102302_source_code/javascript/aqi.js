"use strict";

const searchInput = document.querySelector(".searchInput");  //Selects the input element with the class .searchInput
const aqiContainer = document.getElementById("city-aqi-container");  //Selects the element with the ID city-aqi-container where the AQI information will be displayed
const searchButton = document.getElementById("searchButton"); //Selects the button element with the ID searchButton

searchButton.addEventListener("click", () => {
    fetchAQI();  //calls the fetchAQI function to get the AQI data
    geocode(searchInput.value); //geocode function to locate the city on the map
  });

async function fetchAQI() {
    const city = document.getElementById('searchInput').value;
    const token = '2545fed08b2dbc8e1d73068f9c6f034e0b9b9f36';
    const url = `https://api.waqi.info/feed/${city}/?token=${token}`;

    if(city != '')
    {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            displayResult(data);  //If the city is not empty, it fetches the data from the API and calls displayResult to show the data.
        } catch (error) {
            console.log(error);
            document.getElementById('city-aqi-container').innerText = 'Error fetching AQI. Please try again.'; // If there's an error, it logs the error and displays an error message
        }
    }
    else
    {
        aqiContainer.innerHTML = '';
    }
}


function displayResult(data){
    if(data.status === 'ok') {
        const city = data.data.city.name;
        const aqi = data.data.aqi;
        const info = data.data.city.url;
        const description = getAQIDescription(aqi);
        const color = getAQIColor(aqi);
        const emoji = getAQIEmoji(aqi);
        const extraInfo = getAQIExtraInfo(aqi);

        aqiContainer.innerHTML = `
            <p style="color: ${color};">
                The AQI for ${city} is <strong>${aqi}</strong> ${emoji}. 
                <br>Description: ${description}
                <br>Extra Information: ${extraInfo}
                <br>For more information: <a href="${info}" target="_blank">${info}</a>
            </p>
        `;
    } else {
        aqiContainer.innerHTML = 'No data available for the specified city.';
    }
}

function geocode(city) {
    Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
      var searchManager = new Microsoft.Maps.Search.SearchManager(map);
      var requestOptions = {
        bounds: map.getBounds(),
        where: city,
        callback: function (answer) {
          map.setView({ bounds: answer.results[0].bestView });
          map.entities.push(new Microsoft.Maps.Pushpin(answer.results[0].location));
        }
      };
      searchManager.geocode(requestOptions);
    });
  }

  // Function to get AQI description
function getAQIDescription(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

// Function to get AQI color
function getAQIColor(aqi) {
    if (aqi <= 50) return '#35CD08'; // Good
    if (aqi <= 100) return '#E4C601'; // Moderate
    if (aqi <= 150) return '#E87F15'; // Unhealthy for Sensitive Groups
    if (aqi <= 200) return '#BD0331'; // Unhealthy
    if (aqi <= 300) return '#660099'; // Very Unhealthy
    return '#62001B'; // Hazardous
}

// Function to get AQI emoji
function getAQIEmoji(aqi) {
    if (aqi <= 50) return '😁'; // Good
    if (aqi <= 100) return '😐'; // Moderate
    if (aqi <= 150) return '😷'; // Unhealthy for Sensitive Groups
    if (aqi <= 200) return '🤮'; // Unhealthy
    if (aqi <= 300) return '🤢'; // Very Unhealthy
    return '☠️'; // Hazardous
}

// Function to get extra information based on AQI
function getAQIExtraInfo(aqi) {
    if (aqi <= 50) return 'Breathe easy! The air quality is excellent, posing little to no risk.';
    if (aqi <= 100) return 'Air quality is generally good, but those with sensitivities should take note.';
    if (aqi <= 150) return 'Caution: Sensitive individuals may feel the effects, but most people will be fine.';
    if (aqi <= 200) return 'Heads up! Everyone might start feeling the impact, especially those with health concerns.';
    if (aqi <= 300) return 'Alert: Serious health effects are possible for everyone. Stay safe!';
    return 'Emergency: Health warnings in effect. The entire population is at risk.';
    
}