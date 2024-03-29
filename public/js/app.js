var fetchweather ="/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i')

const weatherCondition = document.querySelector('.weatherCondition')

const tempElement = document.querySelector('.temperature')

const locationElement = document.querySelector('.place')

const dateElement = document.querySelector('.date')

const monthNames = ["jan","feb","march","april","may","june","july","aug","sept","oct","nov","dec"]; 

dateElement.textContent = new Date().getDate() + "," + monthNames[new Date().getMonth()];


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log(search.value); 
    locationElement.textContent ="Loading.....";
    tempElement.textContent="";
    weatherCondition.textContent="";
    const locationApi = fetchweather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error){
                locationElement.textContent = data.error;
                tempElement.textContent="";
                weatherCondition.textContent="";
            }else{
                if(data.description === "rain" || data.description === "fog"){
                    weatherIcon.className = "wi wi-day-" + data.description;
                }
                else{
                    weatherIcon.className = "wi wi-day-cloudy"; 
                }
                locationElement.textContent = data.cityName;
                tempElement.textContent= (data.temprature-273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent= data.description;
            }
        })
    });
})