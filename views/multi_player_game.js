import React from 'react';
import {Modal, StyleSheet, Text, TextInput, Dimensions, TouchableHighlight,
        TouchableOpacity, View, BackHandler } from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import HangmanAnimation from './sections/hangman_animation';
import HangmanInput from './sections/hangman_input';
import HangmanText from './sections/hangman_text';
import HangmanEndStatus from './sections/hangman_end_status';
import HangmanHeader from './sections/hangman_header_multi';
import SoundPlayer from 'react-native-sound-player';

export default class MultiPlayerRoomPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {active_player: 2, assigned_to_player: this.props.navigation.getParam("player", 0),
     waiting_words: ['Waiting for a word','Enter word'], status: this.props.navigation.getParam('status', ''),
     currentValueInput: '', word_input_error: false, error_text: '', input_word: '', input_hint: '',
     counter: 0, message: "", round: 1, score: 10000, username: this.props.navigation.getParam("username", "Jura"), keyPressed:[]};
    this.socket = this.props.navigation.getParam("socket", "jura");
    this.room_number = this.props.navigation.getParam("room_number", 0);
    this.arrayOfChars = [];
    this.score1 = this.state.score;
    this.score2 = this.state.score;
    this.MAX_ROUND = 5;
    this.winner = 'Draw';
    this.socket.onopen = () => this.socket.send(JSON.stringify({type: 'get-rooms-info'}));
   //console.log("Inside Game mode" + this.state.assigned_to_player);
  };

  setModalVisible(status) {
   this.setState({status: 'change', assigned_to_player: 2});
 }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', function(){
      return true;
    });
  }

  componentDidMount(){
    this.socket.onmessage = (e) => {
      let data = JSON.parse(e.data);
     //console.log("Recieved " + data.type);
      switch(data.type){
        case 'player2-joined':{
            this.setState({status:'change'})
        }
        break;
        case 'load-word':{
          this.arrayOfChars = data.word.toUpperCase().split('');
          this.arrayOfChars = this.arrayOfChars.map( x => ({value: x, visible: false}));
          this.hideCharachters(this.arrayOfChars);
            this.setState({
              status:'playing',
              input_hint: data.hint,
              score: (this.state.assigned_to_player === 1)? data.score1: data.score2,
            });

        }
        break;
        case 'next-letter':{
          this.updateLevelPlayingState(data.letter);
        }
        break;
        case 'next-player':{
             //console.log("Next player");
              this.setState((previousState) => {
                status: previousState.status =  "change";
                active_player: previousState.active_player =  data.active_player;
                counter: previousState.counter =  0;
                keyPressed: previousState.keyPressed =  [];
                input_word: previousState.input_word =  '';
                input_hint: previousState.input_hint =  '';
              }
              )
              this.forceUpdate();

        }
        break;
        case 'next-round':{
          this.setState((previousState) => {
            round:previousState.round +=1;
            }
          )
          if(this.state.round !== this.MAX_ROUND){
            this.setState((previousState) => {
              status: previousState.status =  "change";
              active_player: previousState.active_player =  data.active_player;
              counter: previousState.counter =  0;
              keyPressed: previousState.keyPressed =  [];
              input_word: previousState.input_word =  '';
              input_hint: previousState.input_hint =  '';
            }
            )
          }
          else{
            this.nextPlayer('end');


          }
           //console.log('Round'+ this.state.round);
            this.forceUpdate();
        }
        break;
        case 'end-game':{
         //console.log('end game recognized');
          this.winner = data.winner;
          this.setState({status: 'end'});
          this.winnerSound((data.winner === this.state.username)?1:2);
          this.forceUpdate();
        }
        break;
        case 'restart-game':{
            this.setState((previousState) => {
              status: previousState.status =  "change";
              active_player: previousState.active_player =  2;
              counter: previousState.counter =  0;
              keyPressed: previousState.keyPressed =  [];
              input_word: previousState.input_word =  '';
              input_hint: previousState.input_hint =  '';
              round:previousState.round = 1;
              score:previousState.score = 10000;
            }
            )
            this.arrayOfChars = [];
            this.score1 = 10000;
            this.score2 = 10000;
            this.winner = 'Draw';
            this.forceUpdate();
        }
        break;
        case 'room-removed':{
          this.room_number -= 1;
        }
        break;
        default:
      }

      if(data.type === 'get-data'){
       //console.log("INside" + data.rooms);
        //console.error('getting room info from the server');
        if(data.rooms !== undefined && Array.isArray(data.rooms) && data.rooms.length >= 0 ){
          let rooms_array = data.rooms;
         //console.log(rooms_array);
          //ispisujemo novo stanje soba
          this.setState({rooms:rooms_array})
          } else {
           //console.error("Problems with data returned from server - not an array")
          }
        }
      }
    this.socket.onerror = (e) => console.log(e.message);
    this.socket.onclose = (e) => {
      console.log(e.code, e.reason);
    };

  }

  checkWordAndHint(){
    this.play();
    //console.log("sdnfsjkdfsdkjf");
    let error_text = '';
    if(!/^[A-Za-z0-9 čćžšđČĆŽŠĐ]{3,}$/.test(this.state.input_word)){
      error_text += 'Word - Minimum 3 alphanumeric charachters\n';
      this.setState({word_input_error:true, error_text: error_text});
    }
    else if(!/^[A-Za-z0-9 čćžšđČĆŽŠĐ]{3,}$/.test(this.state.input_hint)){
      error_text += 'Hint - Minimum 3 alphanumeric charachters\n';
      this.setState({word_input_error:true, error_text: error_text});
    }
    else{
      error_text = null;
      this.setState({word_input_error:false,error_text: ''})
      this.sendWordAndHint();
    }
  }

  sendWordAndHint(){
   //console.log("sending message to server");
      if(this.state.word_input_error === false){
        let dataToSend = JSON.stringify({type: 'load-word', room_number: this.room_number,
             word: this.state.input_word, hint: this.state.input_hint});
        this.socket.send(dataToSend);
      }
      /*this.socket.send(JSON.stringify({type: 'room', room_number: this.state.rooms.length + 1, username: "Test"}));
      this.setState((previousState) => {
        rooms: previousState.rooms.push({room_number:this.state.rooms.length + 1, player1: "Test"});
        }
      )
      //console.error("sddssfd");
      this.forceUpdate();
    };*/
  }
  nextLetter = (letter) => {
    let dataToSend = JSON.stringify({type: 'next-letter', room_number: this.room_number, letter: letter, score: this.state.score});
    this.socket.send(dataToSend);
  }

  nextPlayer(status){
    //this.socket.send(JSON.stringify({type: 'join-room', room_number: this.state.rooms, username: username, score: 0}));
    if(status === 'next' ){
     //console.log("hehehehehehehehehehehehheh")
      let dataToSend = JSON.stringify({type: 'next-player', room_number: this.room_number, active_player:this.state.active_player, score1: this.score1, score2:this.score2});
      this.socket.send(dataToSend);
    }
    if(status === 'end' ){
      let dataToSend = JSON.stringify({type: 'end-game', room_number: this.room_number, active_player:this.state.active_player, score1: this.score1, score2:this.score2});
      this.socket.send(dataToSend);
    }

  }


  updateState = (typeOfUpdate) => {
    switch (typeOfUpdate){
      case 'nextPlayer':
        if(this.state.round === this.MAX_ROUND){
          this.setState({status:'end'});
          this.nextPlayer('end');
        }
        else{
          this.nextPlayer('next');
        }

        //dodati kod za slanje poruke next-player
        break;
      default:
    }
  };


  hideCharachters = (arrayOfChars,letter = "") => {
    let input_word = "";
    for(let i = 0; i < arrayOfChars.length; i++){
      if(arrayOfChars[i].visible === true){
        input_word += arrayOfChars[i].value;
      }
      if(arrayOfChars[i].value === " " && arrayOfChars[i].visible === false){
        arrayOfChars[i].visible = true;
        arrayOfChars[i].value = "       "
        input_word += "       ";
      }
      if(arrayOfChars[i].value === letter && arrayOfChars[i].visible === false){
        arrayOfChars[i].visible = true;
        input_word += letter;
      }
      if(arrayOfChars[i].visible === false){
        input_word += "_ ";
      }
    }
    //console.log(this.arrayOfChars);
    //console.log(this.state.input_word);
    this.setState((previousState) => {
      input_word: previousState.input_word = input_word;
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
    this.playAuch();
    if(!(this.checkValuesInArray(letter, this.arrayOfChars))){
        this.setState((previousState) => {
          counter: previousState.counter += 1;
          if(this.state.active_player === this.state.assigned_to_player){
            score: previousState.score -= 50;
          }
          if(this.state.active_player === 1){
            this.score1 -= 50;
          }
          else{
            this.score2 -= 50;
          }
          }
        )
      if(this.state.counter >= 10 && (this.state.active_player === this.state.assigned_to_player)){
        this.updateState("nextPlayer");
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

    if(this.state.counter >= 4){
      this.setState((previousState) => {
        message: previousState.message = this.getRandomMessage("positive") ;
        }
      )
    }

    this.hideCharachters(this.arrayOfChars,letter);
    if(this.checkIfAllVisible(this.arrayOfChars) && (this.state.active_player === this.state.assigned_to_player)){
        this.updateState("nextPlayer");
    }
  }
    //console.log(this.arrayOfChars)
    //console.log(letter)
    this.forceUpdate();
  };



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

  restartGame(){
    this.play();
    let dataToSend = JSON.stringify({type: 'restart-game', room_number: this.room_number});
    this.socket.send(dataToSend);
  }
  exitGame(){
    this.play();
    let dataToSend = JSON.stringify({type: 'exit-game', room_number: this.room_number});
    this.socket.send(dataToSend);
    this.props.navigation.navigate('GameTypePage',{username:this.state.username});
  }

  play = () => {
   try {
     SoundPlayer.playSoundFile('button_press', 'wav')
     } catch (e) {
        //console.log(`cannot play the sound file`, e)
     }
   };

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

winnerSound = (type) => {
 try {
   if(type === 1){
      SoundPlayer.playSoundFile('applause', 'mp3');
   }else{
     SoundPlayer.playSoundFile('pat_mat', 'mp3');
   }

   } catch (e) {
      //console.log(`cannot play the sound file`, e)
   }
};


  render() {

    return (
    <View style = {styles.waiting_container}>
        <Modal
        animationType="fade"
        transparent={false}
        visible={(this.state.status === 'created')? true: false}
        onRequestClose={() => {
          ////Alert.//Alert('Modal has been closed.');
        }}>
        <View style={styles.waiting_container}>
          <Text style = {styles.waiting_text}>
              Waiting for player 2
          </Text>
          <AnimatedEllipsis style = {styles.waiting_text} />
        </View>
        </Modal>

        <Modal
        animationType="fade"
        transparent={false}
        visible={(this.state.status === 'change' && this.state.active_player === this.state.assigned_to_player)? true: false}
        onRequestClose={() => {
          //Alert.//Alert('Modal has been closed.');
        }}>
          <View style={styles.waiting_container}>
            <Text style = {styles.waiting_text}>{(this.state.status === 'change'&& this.state.active_player == this.state.assigned_to_player)? this.state.waiting_words[0]: this.state.waiting_words[1]}</Text>
            <AnimatedEllipsis style = {styles.waiting_text}/>
          </View>
        </Modal>


        <Modal
        animationType="fade"
        transparent={false}
        visible={(this.state.status === 'change' && this.state.active_player !== this.state.assigned_to_player)? true: false}
        onRequestClose={() => {
          //Alert.//Alert('Modal has been closed.');
        }}>
        <View style={styles.waiting_container}>

          <Text style = {{fontSize:30, fontFamily:'Reckless'}}>Word:</Text>

          <TextInput
            style={styles.textInput}
            maxLength = {15}
            minLength = {3}
            onChangeText={currentValue => this.setState({input_word:currentValue})}
            value={this.state.input_word}
          />
          <Text style = {{fontSize:30, fontFamily:'Reckless'}}>Word hint:</Text>
          <TextInput
            style={styles.textInput}
            maxLength = {20}
            minLength = {3}
            onChangeText={currentValue => this.setState({input_hint:currentValue})}
            value={this.state.input_hint}
          />

          <TouchableOpacity  style = {styles.button}  title="A" onPress = {() => this.checkWordAndHint()}>
            <Text style = {styles.button_text}>SUBMIT</Text>
          </TouchableOpacity>

          <Text style = {{fontSize: 20, fontFamily: 'Reckless', color: 'red', marginTop: 30,
                          opacity:(this.state.word_input_error)?1:0}}>{this.state.error_text}
          </Text>

        </View>
      </Modal>

      <Modal
      animationType="fade"
      transparent={false}
      visible={(this.state.status === 'playing')? true: false}
      onRequestClose={() => {
        //Alert.//Alert('Modal has been closed.');
      }}>

      <View style = {styles.container}>
         <Text>{this.state.counter}</Text>
        <HangmanAnimation counter={this.state.counter} message={this.state.message}/>
        <HangmanText info = {this.state.input_hint} guessingWord = {this.state.input_word}/>
        {(this.state.active_player === this.state.assigned_to_player)? <HangmanInput tellLetter = {this.nextLetter}/>:null}
        <HangmanHeader level = {this.state.round} points1 = {this.score1} points2 = {this.score2} username={this.state.username}/>
      </View>

    </Modal>

    <Modal
    animationType="fade"
    transparent={false}
    visible={(this.state.status === 'end')? true: false}
    onRequestClose={() => {
      //Alert.//Alert('Modal has been closed.');
    }}>
      <View style={styles.waiting_container}>
        <Text style = {styles.waiting_text}>Winner: {this.winner}</Text>
        <TouchableOpacity  style = {styles.button}  title="A" onPress = {() => this.restartGame()}>
          <Text style = {styles.button_text}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity  style = {styles.button}  title="A" onPress = {() => this.exitGame()}>
          <Text style = {styles.button_text}>Exit</Text>
        </TouchableOpacity>
      </View>
    </Modal>

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
  waiting_text:{
    fontFamily: 'Reckless',
    color:'red',
    fontSize:50,
    textAlign: 'center',
  },
  waiting_container:{
    position:'absolute',
    top: height/3,
    left:0,
    height: height/2,
    width:width,
    alignItems: 'center',
  },
  contentContainer: {
    marginTop:height/20,
    paddingVertical: 20,
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
