import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import Hangman from './complexParts/hangman';
import HighscoreList from './complexParts/highscore_list';

export default class HangmanEndStatus extends React.Component {

  render() {
    let opacity = this.props.status === "playing" ? 0 : 1;
    return (
      <View style = {[styles.container, this.props.status === "playing" ? {zIndex: -1 }: {zIndex: 1 }]} >
        <HighscoreList  opacity = {opacity} list = {this.props.list} scaleFactor = {1.1} width = {Dimensions.get('window').width * 1 / 5} height = {Dimensions.get('window').height * 2 / 5}/>
        <Hangman message = {this.props.status === "winner" ? "Yuhuhu" : "Fucking wanker"} scaleFactor = {0.8} opacity = {opacity} counter = {10} width = {Dimensions.get('window').width * 3 / 5} height = {Dimensions.get('window').height * 3 / 5}/>
        <Text style = {styles.text}>{this.props.status === "winner" ? "Winner" : "You lost"}</Text>
        <Button
            title="Restart Game"
            onPress={() =>
              this.props.navigation.navigate('GameTypePage')
            }
          />
          <Button
              title="Go to start Page"
              onPress={() =>
                this.props.navigation.navigate('LandingPage')
              }
            />
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
    height: height,
    backgroundColor: '#fff',
    fontSize:40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    marginTop:height/7,
    fontSize:40,
    fontFamily:'Reckless',
  }
});
