// function orderPizza(callback) {
//   console.log("Preparing pizza");
//   setTimeout(() => {
//     callback();
//   }, 5000);
// }
// function pizzaIsReady() {
//   console.log("Pizza is prepared");
// }
// console.log("Open Ucampus app");
// orderPizza(pizzaIsReady);

// const { response } = require("express");

// callback hell
/* function getLocation(){
        function getLAtLong(){
            function getWeather(){
                function getWeatherDetails(){
                    ....
                }
            }    
        }    
    }
*/
// Promise

// Promise Maker
// Promise receiver

// Pending , Fullfilled , Rejected

// function getWeather() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Getting weather");
//       resolve("Winter");
//       //   reject("no weather data");
//     }, 3000);
//   });
// }
// function getWeatherDetails(data) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       switch (data) {
//         case "Rainy":
//           resolve("Rainy weather data");
//           break;
//         case "Summer":
//           resolve("Summer weather data");
//           break;
//         default:
//           reject("No data available ");
//       }
//     }, 2000);
//   });
// }
// const onSuccess = function method1(data) {
//   console.log("onfulfilled", data);
// };
// const onError = function method2(data) {
//   console.log("onRejected", data);
// };
// getWeather().then(getWeatherDetails).then(onSuccess).catch(onError);

// fetch("http://localhost:5000/")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });
// fetch users data with API

// const result = fetch("https://jsonplaceholder.typicode.com/users");
// console.log(result);

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// async await

async function fetchData(url) {
  try {
    const responseData = await fetch(url);
    const jsonData = await responseData.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
}

const cityName = "Tokyo";
fetchData(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)
  .then((data) => {
    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    return url;
  })
  .then((url) => {
    return fetchData(url);
  })
  .then((data) => {
    console.log(data.current_weather.temperature);
  });

//
// const latitude = ?
// const longitude = ?
// https://api.open-meteo.com/v1/forecast?latitude=?&longitude=?&current_weather=true
// console.log(weather);
