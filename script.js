// select where on the document you're making changes

// Weather API key 8c9318fe12489557d957990035bdacc5
// Variable to Store the API Key
var APIkey= "8c9318fe12489557d957990035bdacc5";

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}





//THIS IS EXTRA CODE -  it makes the user able to tab over to the submit buton
//                      and press "enter" instead of clicking on it.
// Execute a function when the user presses a key on the keyboard
document.querySelector("#submitbtn").addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submitbtn").click();
  }
});
// END of keypress function





//create event listener to input user data
document.querySelector("#submitbtn").addEventListener("click", function (){

  //make divs go from hidden to visible

  //define city variable as value for user input
  var city = document.querySelector("#userInput").value
  //plug in the userInput as a variable into a function
  getWeather(city)
    console.log(
        "click confirm")
      }
)

//appends buttons that were saved to local storage 46-49 (outside of getWeather function so it will run when page loads)
 if(localStorage.getItem("Searches")!= null){
  searchHistoryArray=localStorage.getItem("Searches")
  $("#searchHistory").append(searchHistoryArray)
 } 
  if(searchHistoryArray.length >= 5){
    
  console.log("5 button max")
 }


$("#clearBtn").on("click", function(){
  localStorage.clear("Searches")
  //^ clears our "Searches" local storage
  $("#searchHistory").empty()
  //^ clears the appended #searchHistory section
})

$(".srchBtn").on("click",function(){



  city = $(this).attr("value")
  //^this makes the variable value equal the attribute "value" in this srchBtn we created
  getWeather(city)
})
// define the function you want your userInput to go into (in this case, its used to define the URL you want to query)
function getWeather(city){ 
  // make Anchorman meme dissappear
$("#anchorman").remove()
            //incase we click input multiple times, you must clear the elements you are appending
  $("#forecastWeather").empty()
  $("#todaysWeather").empty() 
//create a variable to concatenate our parameters, input and api key
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`
  var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`
console.log(queryURL)
fetch(queryURL)
    .then(function(response){
        return response.json();
    } )
    .then(function (data) {
       console.log(data)


       var conditions;
       if(data.weather[0].main === "Clouds"){
 
         conditions = "cloudyicon.png"
       } else if(data.weather[0].main === "Clear"){
         conditions = "Sol-badbunny.jpg"
       } else if(data.weather[0].main === "Rain" || data.weather[0].main === "Drizzle" ){
         conditions = "more-rain-meme.jpg"
       } else if(data.weather[0].main === "Fog" || data.weather[0].main === "Mist"){
         conditions = ""
       } else if (data.weather[0].main === "Snow" || data.weather[0].main === "Sleet"){
         conditions = ""
       } else{
         conditions = ""
         // thunderstorm is last condition
       }
       
    //create an HTML div & plug it in
    var weatherDisplay = 
      //creating the elements within the div to display information we want
    `<h3>${data.name}</h3>
      <p>${"Temperature " + data.main.temp}</p>
      <p>${"Humidity % " + data.main.humidity}</p>
      <p>${"Wind Speed" + data.wind.speed + "MPH"}</p>
      <img src="${conditions}">
      `
   
      //append the ID you want to put it in with that variable of desired display data^
      $("#todaysWeather").append(weatherDisplay)
    //create a variable for search history buttons, append the button on the page with the name from api data
      var srchBtn = 
      `<button class= "srchBtn" value="${data.name}">${data.name}</button>`
      $("#searchHistory").append(srchBtn)


      var searchHistoryArray = []
      //
      if(localStorage.getItem("Searches")!= null){
        searchHistoryArray=localStorage.getItem("Searches")
        searchHistoryArray+=srchBtn
        localStorage.setItem("Searches", searchHistoryArray)
      }else {
        searchHistoryArray+=srchBtn
        localStorage.setItem("Searches", searchHistoryArray)
      }
  
    });


    //fetch the 5 day forecast data 
   

    fetch(forecastURL)
    .then(function(response){
      return response.json();
  } )
  .then(function (data){
    console.log(data)
    //create a for loop to grab the data for 5 days
    for(var i = 4; i< 37; i+=8)
    {

      var conditions;
      if(data.list[i].weather[0].main === "Clouds"){

        conditions = "cloudyicon.png"
      } else if(data.list[i].weather[0].main === "Clear"){
        conditions = "Sol-badbunny.jpg"
      } else if(data.list[i].weather[0].main === "Rain" || data.list[i].weather[0].main === "Drizzle" ){
        conditions = "more-rain-meme.jpg"
      } else if(data.list[i].weather[0].main === "Fog" || data.list[i].weather[0].main === "Mist"){
        conditions = "fogmeme.jpg"
      } else if (data.list[i].weather[0].main === "Snow" || data.list[i].weather[0].main === "Sleet"){
        conditions = "snow.jpg"
      } else{
        conditions = ""
        // thunderstorm is last condition
      }

      //create a div, query elements into it and append to the HTML
     var forecastDiv =  
      `<div class="weatherDiv" id="weatherDiv1">
      <h3> ${city} <h3>
      <h3>${data.list[i].dt_txt} </h3>
      <p>${"Temperature " + data.list[i].main.temp}</p>
      <p>${"Humidity % " + data.list[i].main.humidity}</p>
      <p>${"Wind Speed MPH " + data.list[i].wind.speed}</p>
      <img id="weatherIcons" src="${conditions}">
      </div>`
      //append to apply to HTML
      $("#forecastWeather").append(forecastDiv)
     // data.list[i].weather[0].main
    
}
  } 
  )
  }