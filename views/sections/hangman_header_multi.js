import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import Hangman from './complexParts/hangman';

export default class HangmanHeader extends React.Component {

  render() {
    return (
      <View style = {styles.container} >
        <View style = {styles.leftView} >
          <Text style = {{fontFamily: 'Reckless', fontSize:20}}> P1: {this.props.points1}</Text>
        </View>
        <View style = {styles.centerView} >
          <Text style = {{textAlign:'center',fontFamily: 'Reckless', fontSize:20}}>Round: {this.props.level}</Text>
        </View>
        <View style = {styles.rightView} >
          <Text style = {{textAlign:'right',fontFamily: 'Reckless', fontSize:20}}>P2: {this.props.points2}</Text>
        </View>
        <View style = {styles.username_header} >
          <Text style = {{textAlign:'center',fontFamily: 'Reckless', fontSize:20, color:'red'}}>{this.props.username}</Text>
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
    left:width * 2 / 3,
    width: width / 3,
    height: height * 1 / 28,
    padding:5
  },
  leftView:{
    position:'absolute',
    top:0,
    left:0,
    width: width / 3,
    height: height * 1 / 28,
    padding:5
  },
  centerView:{
    position:'absolute',
    top:0,
    left:width / 3,
    width: width / 3,
    height: height * 1 / 28,
    padding:5
  },
  username_header:{
    position:'absolute',
    top:height * 1 / 20,
    left:0,
    width: width ,
    height: height * 1 / 20,
    padding:5
  }
});
