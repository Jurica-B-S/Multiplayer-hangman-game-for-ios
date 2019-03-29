import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import {AsyncStorage} from 'react-native';
import SoundPlayer from 'react-native-sound-player';

export default class InsertPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentValueInput:'', word_input_error:false, error_text:''};
  }
  checkUsername(){
    let error_text = '';
    if(!/^[A-Za-z0-9 čćžšđČĆŽŠĐ]{3,}$/.test(this.state.currentValueInput)){
      error_text += 'Username - Minimum 3 maximum 6 alphanumeric charachters\n';
      this.setState({word_input_error:true, error_text: error_text});
    }
    else{
      this.props.navigation.navigate('GameTypePage',{username:this.state.currentValueInput});
    }
  }

  //sounds
  play = () => {
   try {

     SoundPlayer.playSoundFile('button_press', 'wav')
     // or play from url
     this.checkUsername();

     } catch (e) {
         //console.log(`cannot play the sound file`, e)
     }
 };


  render() {
    return (
    <View style = {styles.container}>

      <Text style = {{fontSize:30, fontFamily:'Reckless'}}>Username:</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.textInput}
          maxLength = {6}
          onChangeText={currentValue => this.setState({currentValueInput:currentValue})}
          value={this.state.currentValueInput}
          //onChangeText={"....AJDE"}
        />
      </View>
      <TouchableOpacity  style = {styles.button}  title="A" onPress = {this.play}>
        <Text style = {styles.button_text}>SUBMIT</Text>
      </TouchableOpacity>

      <Text style = {{fontSize:20, fontFamily:'Reckless', color: 'red', marginTop: 20,
      opacity: (this.state.word_input_error)? 1: 0}}>{this.state.error_text}</Text>


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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    width:200,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize:30,
    marginTop:30,
    fontFamily: 'Reckless',
  },
  button_text:{
      color:'white',
      fontSize:30,
      fontFamily: 'Reckless',
      paddingTop:6,
  },
  button:{
    width: width / 2,
    height: width / 10,
    borderRadius:width/20,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#000',
    marginTop: 30
  },
});
