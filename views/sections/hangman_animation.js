import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import Hangman from './complexParts/hangman';

export default class HangmanAnimation extends React.Component {

  render() {
    return (
      <View style = {styles.container} >

      <Hangman message = {this.props.message}  scaleFactor  = {1.5} opacity = {1} counter = {this.props.counter} 
        width = {Dimensions.get('window').width * 2 / 5 } height = {Dimensions.get('window').height * 2 / 5}/>
      </View>
    );
  }
}
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    width: width,
    height: height * 2 / 5,
    fontSize:40
  },
});
