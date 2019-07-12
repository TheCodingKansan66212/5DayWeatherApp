import * as React from 'react';
import { AppRegistry, Text, View, StyleSheet, Image} from 'react-native';
import { Constants } from 'expo';
import { Component } from 'react';

// import pure js models available in npm
import { Card } from 'react-native-paper';
import { Divider } from 'react-native-elements';

export default class ForecastCard extends Component {
  render(){
    let time;
    //create a new date from the passed date time
    var date = new Date(this.props.detail.dt*1000);

    //hours part from the timestamp
    var hours = date.getHours();

    //minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    time = hours + ':' + minutes.substr(-2);

   return (
     <Card containerStyle = { styles.card }>
        <Text style={styles.notes}>{this.props.location}</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItem:'center'}}>
            <Image style={{width:100, height:100}} source={{uri:"https://openweathermap.org/img/w" + this.props.detail.weather[0].icon + "png"}} />
            <Text style={styles.time}>{time}</Text>
          </View>

          <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.notes}>{this.props.detail.weather[0].description}</Text>
              <Text style={styles.notes}>(Math.round( this.props.detail.main.temp * 10) / 10 )&#8451;</Text>
            </View>
       </Card>
    );
  }
}


const styles = StyleSheet.create ({
  card: {
    backgroundColor: 'rgba(56, 172, 236, 1)',
    borderWidth: 0,
    borderRadius: 20
  },
  time: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize'
  }
});