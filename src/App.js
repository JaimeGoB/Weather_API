import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Headers from './Headers';
import Modal from './Modal';

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
      isRaining: "",
      showModal: true

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
  /*Function is used to swithc Modal Button to false*/
  removeModal = () => {
    this.setState({
      showModal: false
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
            <button onClick={this.removeModal} className="btn">Remove from DOM!</button>
            <Headers temp={this.state.temp} isRaining={this.state.isRaining} />

            {/*This will trigger searchCity function when user submits*/}
            <form onSubmit={this.searchCity}>
              <input type="text" id="city" placeholder="Enter a city name"></input>
            </form>

          </div>
        </div>


        {/*Modal Button*/}
        <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Weather Details</a>

        {/*Conditionally render modal based if it is true or not*/}
        {this.state.showModal ? <Modal iconUrl={iconUrl} weather={this.state.weather} cityName={this.state.cityName} low={this.state.low} high={this.state.high} />
          : ""}

      </div>
    );
  }
}



export default App;
