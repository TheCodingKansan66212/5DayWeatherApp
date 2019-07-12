import * as React from 'react';
import { AppRegistry, Text, View, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';
import { Component } from 'react';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { Divider } from 'react-native-elements';

import { Flatlist } from 'react-native';

import ForecastCard from './components/ForecastCard.js';


export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error: ''
    };
  }

  componentDidMount(){
    //get user's location
    this.getLocation();
  }

  getLocation(){

    //get user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState(
            (prevState) => ({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }), () => { this.getWeather(); }
        );
      },
      (error) => this.setState({ forecast: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  getWeather(){

    //construct the API uri to call
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' +
     this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=4ea7aabc31a856ef350728d2cdb3c0c9';

  //call the API, and set the state of the weather forecast
  fetch(url)
  .then(response => response.json())
  .then(data => {
    this.setState((prevState, props) => ({
        forecast: data
    }));
  })
  }

  render() {
    return (
      <Flatlist data={this.state.forecast.list} style={{marginTop: 28}} keyExtractor={item => item.dt_text} renderItem={({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} /> 
    );
  }
}//end class

AppRegistry.registerComponent('5dayweather', () => App);
