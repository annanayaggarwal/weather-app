const request = require('request');
const constants = require('../config')

const weatherData = (address,callback)=>{
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;

    request({url, json:true}, (error,{body})=>{
        if(error){
            callback("cant fatch data from the open waether map api",undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather){
            callback("unable to find the data try another location",undefined)
        } else{
            callback(undefined,{
                temprature : body.main.temp,
                description : body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;