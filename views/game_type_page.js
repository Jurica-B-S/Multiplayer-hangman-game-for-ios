import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import SoundPlayer from 'react-native-sound-player';

export default class GameTypePage extends React.Component {

  singlePlayer = () => {
   try {
     SoundPlayer.playSoundFile('button_press', 'wav')
     this.props.navigation.navigate('SinglePlayerPage')
     } catch (e) {
         //console.log(`cannot play the sound file`, e)
     }
 };

 multiPlayer = () => {
  try {
    SoundPlayer.playSoundFile('button_press', 'wav')
    this.props.navigation.navigate('MultiPlayerPage',{username:this.props.navigation.getParam("username", "Jura")})
    } catch (e) {
      // console.log(`cannot play the sound file`, e)
    }
};

  render() {
    //console.log(this.props.navigation.getParam("username", "Jura"));
    return (
      <View style = {styles.container}>
      <TouchableOpacity  style = {styles.button1}  title="A" onPress = {this.singlePlayer}>
        <Text style = {styles.button_text}>SINGLE PLAYER</Text>
      </TouchableOpacity>
      <TouchableOpacity  style = {styles.button2}  title="B" onPress = {this.multiPlayer}>
        <Text style = {styles.button_text}>MULTIPLAYER</Text>
      </TouchableOpacity>
      </View>
    );
  }
}
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 80,
    width:200,
    borderColor: 'gray',
    borderWidth: 1,
    paddingTop:6
  },
  button_text:{
      color:'white',
      fontSize:30,
      fontFamily: 'Reckless',
      paddingTop:6,
  },
  button1:{
    position:'absolute',
    top: height / 2 - width / 10,
    left: width / 4,
    width: width / 2,
    height: width / 10,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:width/20,
    backgroundColor:'#000',
    margin: 4
  },
  button2:{
    position:'absolute',
    top:height / 2 + width / 10,
    left: width / 4,
    width: width / 2,
    height: width / 10,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius:width/20,
    backgroundColor:'#000',
    margin: 4
  },

});
