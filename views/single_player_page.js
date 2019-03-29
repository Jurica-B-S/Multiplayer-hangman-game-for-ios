import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import {AsyncStorage} from 'react-native';
import HangmanAnimation from './sections/hangman_animation';
import HangmanInput from './sections/hangman_input';
import HangmanText from './sections/hangman_text';
import HangmanEndStatus from './sections/hangman_end_status';
import HangmanHeader from './sections/hangman_header';
import SoundPlayer from 'react-native-sound-player';

const apiLinkGetJson = "https://hangman.work/getjson";
const apiLinkSendJson = "https://hangman.work/sendjson";

export default class SinglePlayerPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {counter:0, guessText:"", status:"playing", message:"",
    level:1, points:0, infoAboutGuessingWord:"", highscoreList:"Not loaded", username:"",
    keyPressed:[]};
    //console.log(this.props.username);

  }
  componentDidMount(){
    this.arrayOfChars = this.getRandomWord(1);
    this.hideCharachters(this.arrayOfChars);
    this.getHighscoreList(apiLinkGetJson);
    //this._retrieveData("username");
    this.forceUpdate();
  }

  //most important function !!!!
  updateState = (typeOfUpdate) => {
    switch (typeOfUpdate){
      case 'nextLevel':
        this.setState((previousState) => {
          level: previousState.level +=  1;
          counter: previousState.counter = 0;
          }
        )
        if(this.state.level === 11){
          this.updateState('win');
          this.getHighscoreList(apiLinkSendJson);
          this.setHighscoreList(apiLinkSendJson,{name:this.props.username, value:this.state.points});
        }
        this.arrayOfChars = this.getRandomWord(this.state.level);
        this.hideCharachters(this.arrayOfChars);
        break;
      case 'win':
        this.setState((previousState) => {
          status: previousState.status =  "winner";
          }
        )

        break;
      case 'lose':
        this.setState((previousState) => {
          status: previousState.status =  "loser";
        }
        )
        //console.log({name:this.state.username, value:this.state.points});
        this.setHighscoreList(apiLinkSendJson,{name:this.state.username, value:this.state.points});
        break;
      default:
    }
    this.forceUpdate();
  };


  hideCharachters = (arrayOfChars,letter = "") => {
    let guessText = "";
    for(let i = 0; i < arrayOfChars.length; i++){
      if(arrayOfChars[i].visible === true){
        guessText += arrayOfChars[i].value;
      }
      if(arrayOfChars[i].value === " " && arrayOfChars[i].visible === false){
        arrayOfChars[i].visible = true;
        arrayOfChars[i].value = "       "
        guessText += "       ";
      }
      if(arrayOfChars[i].value === letter && arrayOfChars[i].visible === false){
        arrayOfChars[i].visible = true;
        guessText += letter;
      }
      if(arrayOfChars[i].visible === false){
        guessText += "_ ";
      }
    }
    //console.log(this.arrayOfChars);
    //console.log(this.state.guessText);
    this.setState((previousState) => {
      guessText: previousState.guessText = guessText;
      }
    )
  }

  checkValuesInArray = (letter, array) => {
    let len = array.length;
    for(let i = 0; i < len ; i++){
      if(array[i].value === letter){
        return true;
      }
    }
    return false;
  }

  checkIfAllVisible = (array) => {
    let len = array.length;
    for(let i = 0; i < len ; i++){
      if(array[i].visible === false){
        return false;
      }
    }
    return true;
  }

  updateLevelPlayingState = (letter) => {
    if(!(this.checkValuesInArray(letter, this.arrayOfChars))){
      this.playAuch();
      this.setState((previousState) => {
        counter: previousState.counter += 1;
        points: previousState.points -= 50 * this.state.level;
        }
      )
      if(this.state.counter >= 10){
        this.updateState("lose");
        //this.props.navigation.navigate('LandingPage')
      }
      if(this.state.counter >= 4){
        this.setState((previousState) => {
          message: previousState.message = this.getRandomMessage("negative") ;
          }
        )
      }
  } else {
    this.playYeah();
    let len = this.arrayOfChars.length;
    let isVisible = false;
    for(let i = 0; i < len ; i++){
      if(this.arrayOfChars[i].value === letter){
        if(this.arrayOfChars[i].visible === true){
          isVisible = true;
        }
      }
    }
    if(!isVisible){
      this.setState((previousState) => {
        points: previousState.points += 100 * this.state.level;
        }
      )
    }
    if(this.state.counter >= 4){
      this.setState((previousState) => {
        message: previousState.message = this.getRandomMessage("positive") ;
        }
      )
    }

    this.hideCharachters(this.arrayOfChars,letter);
    if(this.checkIfAllVisible(this.arrayOfChars)){
        this.updateState("nextLevel");
    }
  }
    //console.log(this.arrayOfChars)
    //console.log(letter)
    this.forceUpdate();
  };

  getRandomWord = (level) => {
    let l1 = [{value: 'cat', info: 'Domestic animal'},{value: 'Dog', info: 'Domestic animal'},{value: 'Pencil', info: 'You write with it'},
    {value: 'Thor', info: 'One of the Avengers'},{value: 'Seat', info: 'Best car manufacturer'}];

    let l2 = [{value: 'Bulma', info: 'Cool Girl'},{value: 'Credit Card', info: '5cm that girls love'},{value: 'Dubrovnik', info: 'City in Croatia'},{value: 'Amazon', info: 'Biggest online market company'},{value: 'Edison', info: 'Tesla > '}];

    let l3 = [{value: 'Wild pig', info: 'Wild animal'},{value: 'Lion', info: 'Wild animal'},{value: 'Scarface', info: 'Movie with Pacino'},{value: 'Rita Ora', info: 'Albanian singer'},{value: 'Wilson', info: 'Callum'}];

    let l4 = [{value: 'Shawshank redemption', info: 'Top 10 Imdb'},{value: 'Jura', info: 'Movie'},{value: 'Wachowskis', info: 'Directors of Matrix - sisters'},{value: 'Linz', info: 'City in Austria'},{value: 'Kilimanjaro', info: 'Famus mountain'}];

    let l5 = [{value: 'Amsterdam', info: 'Anna Frank home town'},{value: 'Cain', info: 'First Bible murderer'},{value: 'Ganges', info: 'Holy river'},
    {value: 'Aretha Franklin', info: 'Queen of soul'},{value: 'Keith Flint', info: 'Prodigy frontman'}];

    let l6 = [{value: 'Fenty', info: 'Rihanna surname'},{value: 'Aaron', info: 'Elvis middle name'},{value: 'Amazon', info: 'Longest river'},{value: 'Lake superior', info: 'Largest freshwater lake'},{value: 'Greenland', info: 'Biggest island'}];

    let l7 = [{value: 'Katharine Hepburn', info: 'Actress with most oscars'},{value: 'Rocky Marciano', info: 'Heavyweight never defeated'},{value: 'Peter Beardsley', info: 'Played for Liverpool, Everton, Man C, and Man U'}, {value: 'Margaret Thatcher', info: 'UK prime minister in 1980'},{value: 'Eurostar', info: 'Train between UK and France'}];

    let l8 = [{value: 'The merchant of Venice', info: 'Shakespeare play - Shylock'},{value: 'The diamond sutra', info: 'Oldest printed book'},{value: 'Vienna', info: 'Oldest zoo in the world - city'},{value: 'George Carey', info: 'Invented TV'},{value: 'Top of the pops', info: 'BBC show hosted from 1964 to 2006'}];

    let l9 = [{value: 'Zumba', info: 'Dance workout'},{value: 'Anemometer', info: 'Wind speed'},{value: 'Roberto Baggio', info: 'The divine ponytail'},
    {value: 'Dimitri Mendeleev', info: 'Periodic table'},{value: 'Antoine Lavoisier', info: 'Father of modern chemistry'}];

    let l10 = [{value: 'Cellulose', info: 'Polymer in paper'},{value: 'Figueras', info: 'Salvador Dali living town'},
    {value: 'Buddha', info: 'Sidartha Gautama'},{value: 'Nairobi', info: 'Kenya capital'},{value: 'Tegucigarpa', info: 'Capital of Honduras'}];


    let wordString = [l1,l2,l3,l4,l5,l6,l7,l8,l9,l10];
    let i = Math.floor( (Math.random() * 1000) ) % 5;
    let arrayOfChars = wordString[level-1][i].value.toUpperCase().split('');
    arrayOfChars = arrayOfChars.map( x => ({value: x, visible: false}));
    this.setState((previousState) => {
      infoAboutGuessingWord: previousState.infoAboutGuessingWord = wordString[level-1][i].info ;
      }
    )
    return arrayOfChars;
  }
  getRandomMessage(typeOfMessage){
    let arrayOfMessagesPositive =["Thats the way to do it!", "You are the boss!", "Fuck me i love you!","You are a godsend!",
     "I wanna be your sex slave!", "Keep doing that baby!", "You are awesome!", "I will give you 42 virgins!", "Yeah baby!"];
    let arrayOfMessagesNegative =["Stupid bitch!", "Im gonna be hanged because of you", "Please be carefull", "Are you stupid or something",
    "Don't bother i see you are from potporni poslovi", "This is not a game motherfucker", "Another Morata bitch"];
    if(typeOfMessage==="positive"){
      let i = Math.floor( (Math.random() * 1000) ) % arrayOfMessagesPositive.length;
      return arrayOfMessagesPositive[i];
    }
    if(typeOfMessage==="negative"){
      let i = Math.floor( (Math.random() * 1000) ) % arrayOfMessagesNegative.length;
      return arrayOfMessagesNegative[i];
    }

  }

  endGame(status){
    //status: playing, winner, loser
    this.setState((previousState) => {
      status: previousState.status =  status;
      }
    )
  }

  getHighscoreList = (apiLinkGetJson) => {
    fetch(apiLinkGetJson, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstParam: 'yourValue',
            secondParam: 'yourOtherValue',
          }),
        }).then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson);
          this.setState((previousState) => {
            highscoreList: previousState.highscoreList =  responseJson;
            }
          )
          this.forceUpdate();
        })
        .catch((error) => {
         //console.error(error);
        });
      }

      setHighscoreList = (apiLinkSendJson, data) => {
        fetch(apiLinkSendJson, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            }).then((response) => response.json())
            .then((responseJson) => {
              //responseJson: {message :"InsertionError" || "InsertedScore"}
              if(responseJson.message === "InsertedScore"){
                //console.log("Sucess in database insertion");
              }
              else{
                //console.log("Error in database insertion");
              }
            })
            .catch((error) => {
             //console.error(error);
            });
          }


      playAuch = () => {
       try {
         SoundPlayer.playSoundFile('au', 'wav')
         } catch (e) {
            //console.log(`cannot play the sound file`, e)
         }
     };

     playYeah = () => {
      try {
        SoundPlayer.playSoundFile('yeah', 'mp3')
        } catch (e) {
           //console.log(`cannot play the sound file`, e)
        }
    };

  render() {

    return (
      <View style = {styles.container}>
         <Text>{this.state.counter}</Text>
        <HangmanAnimation counter={this.state.counter} message={this.state.message}/>
        <HangmanText info = {this.state.infoAboutGuessingWord} guessingWord = {this.state.guessText}/>
        <HangmanInput tellLetter = {this.updateLevelPlayingState} />
        <HangmanEndStatus navigation = {this.props.navigation} status={this.state.status} list = {this.state.highscoreList} playerScore = {this.state.currentPlayerScore}/>
        <HangmanHeader level = {this.state.level} points = {this.state.points}/>
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
    height: 80,
    width:200,
    borderColor: 'gray',
    borderWidth: 1
  },
});
