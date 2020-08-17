import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    //Initializin temp
    this.state = {
      temp: "",
      high: "",
      low: "",
      weather: "",
      icon: "",
      cityName: "",
      isRaining: ""

    }


  }

  componentDidMount() {

    //The default city value for getting weather is Dallas
    this.getCityWeather("Dallas");

    /*Modal Button effect after clicking it.*/
    var elems = document.querySelectorAll('.modal');
    var instances = window.M.Modal.init(elems);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.state.weather !== prevState.weather) {
      const isRaining = this.state.weather.includes("rain");
      if (isRaining) {
        this.setState({
          isRaining: "It is raining"
        })
      }
    }
  }

  searchCity = (e) => {
    e.preventDefault();
    //Getting the value from input text from form and storing into city
    const city = document.getElementById('city').value;

    this.getCityWeather(city);
  }

  getCityWeather = (city) => {

    /*These will be used for API */
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`
    //get request based on url then we will run code
    //inside of anon function
    axios.get(url).then((resp) => {
      this.setState({
        temp: resp.data.main.temp,
        high: resp.data.main.temp_max,
        low: resp.data.main.temp_min,
        weather: resp.data.weather[0].description,
        icon: resp.data.weather[0].icon,
        cityName: resp.data.name
      })
    })
  }


  render() {
    //Icon lists are in: https://openweathermap.org/weather-conditions
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}@2x.png`

    return (
      <div className="App">
        <div className="row">
          <div className="col s6 offset-s3">
            <h1> Weather</h1>
            <h1> {this.state.isRaining}</h1>


            {/*This will trigger searchCity function when user submits*/}
            <form onSubmit={this.searchCity}>
              <input type="text" id="city" placeholder="Enter a city name"></input>
            </form>

          </div>
        </div>


        {/*Modal Button*/}
        <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Weather Details</a>

        {/*Modal Button*/}
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.cityName}</h4>
            <p> Temp: {this.state.temp}</p>
            <p> High: {this.state.high} - Low: {this.state.low}</p>
            <p> {this.state.weather} <img src={iconUrl} /> </p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
        {/*Modal Button*/}


      </div>
    );
  }

}



export default App;
