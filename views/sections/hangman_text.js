import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

export default class HangmanText extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.infoContainer1}>
          <Text  style = {styles.infoText}>
            {this.props.info}
          </Text>
        </View>
        <View style = {styles.infoContainer2}>
          <Text  style = {styles.text_style}>
            {this.props.guessingWord}
          </Text>
        </View>
      </View>
    );
  }
}
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top: height * 2 / 5,
    width: width,
    height: height * 1 / 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_style:{
    fontSize:35,
    flexWrap: 'wrap',
    color:'black',
    fontFamily: 'Reckless',
  },
  infoContainer1: {
    position:'absolute',
    top: 0,
    left: 0,
    width: width,
    height: width * 1 / 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  infoContainer2: {
    position:'absolute',
    top: width * 1 / 20,
    left: 0,
    width: width,
    height: width * 1 /10,
    marginTop:20,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  infoText:{
    fontSize:35,
    flex: 1,
    flexWrap: 'wrap',
    color:'red',
    fontFamily: 'Reckless',
  }
});
