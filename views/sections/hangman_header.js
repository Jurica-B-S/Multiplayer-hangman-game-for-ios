import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import Hangman from './complexParts/hangman';

export default class HangmanHeader extends React.Component {

  render() {
    return (
      <View style = {styles.container} >
        <View style = {styles.leftView} >
          <Text style = {{fontFamily: 'Reckless', fontSize:20}}>Level: {this.props.level}</Text>
        </View>
        <View style = {styles.rightView} >
          <Text style = {{textAlign:'right',fontFamily: 'Reckless', fontSize:20}}>{this.props.points}</Text>
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
    top:height * 1 / 25,
    left:0,
    width: width,
    height: height * 1 / 28,
  },
  rightView:{
    position:'absolute',
    top:0,
    left:width / 2,
    width: width / 2,
    height: height * 1 / 28,
    padding:5
  },
  leftView:{
    position:'absolute',
    top:0,
    left:0,
    width: width / 2,
    height: height * 1 / 28,
    padding:5
  }
});
