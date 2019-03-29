import React from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity } from 'react-native';
import Hangman from './sections/complexParts/hangman';
import SoundPlayer from 'react-native-sound-player';

export default class LandingPage extends React.Component {

   play = () => {
    try {
      // play the file tone.mp3
      //SoundPlayer.onFinishedPlaying(this.props.navigation.navigate('InsertPage'));
      SoundPlayer.playSoundFile('button_press', 'wav')
      // or play from url
      this.props.navigation.navigate('InsertPage');

      } catch (e) {
          //console.log(`cannot play the sound file`, e)
      }
  };

  render() {

    return (
      <View style = {styles.container}>
        <Hangman  message = {'Can you save me ?'}  scaleFactor  = {2} opacity = {1} counter = {10}
          width = {Dimensions.get('window').width * 2 / 5} height = {Dimensions.get('window').height * 2 / 5}
          />

        <TouchableOpacity  style = {styles.button}  title="A" onPress = {this.play}>
          <Text style = {styles.button_text}>START HANGMAN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    position:'absolute',
    width: width,
    height: height,
    top:height / 5,
    backgroundColor: '#fff',
  },
  button:{
    position:'absolute',
    top: height * 1 / 2,
    left: width / 4,
    width: width / 2,
    height: width / 10,
    borderRadius:width/20,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#000',
    margin: 4
  },
  button_text:{
      color:'white',
      fontSize:30,
      fontFamily: 'Reckless',
      paddingTop:6,
  }
});
