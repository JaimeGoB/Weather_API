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
      cityName: ""

    }


  }

  componentDidMount() {
    /*These will be used for API */
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d'
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


    /*Modal Button effect after clicking it.*/
    var elems = document.querySelectorAll('.modal');
    var instances = window.M.Modal.init(elems);
  }

  render() {
    //Icon lists are in: https://openweathermap.org/weather-conditions
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}@2x.png`

    return (
      <div className="App">

        <h1> Weather</h1>

        {/*Modal Button*/}
        <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Weather Details</a>
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
