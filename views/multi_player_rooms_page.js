import React from 'react';
import { StyleSheet, Text,  Dimensions, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import SoundPlayer from 'react-native-sound-player';

export default class MultiPlayerRoomPage extends React.Component {
  constructor(props){
    super(props);
   //console.log(this.props.navigation.getParam("username", "Jura"));
    this.state = {rooms:[]};
    this.socket = new WebSocket('ws://hangman.work:8080');
    this.rooms = [];
    this.socket.onopen = () => this.socket.send(JSON.stringify({type: 'get-rooms-info'}));
  };

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', function(){
      return true;
    });
  }

  componentDidMount(){
    this.socket.onmessage = (e) => {
      let data = JSON.parse(e.data);
     //console.log("Recieved " + data.type);
      if(data.type === 'rooms-info'){
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
        if(data.type === 'room-created'){
         //console.log("INside succesfull room creation");
          this.forceUpdate();
          this.props.navigation.navigate('MultiPlayerGame',{socket:this.socket, player: 1, status: 'created', room_number: data.room_number, username: this.props.navigation.getParam("username", "Jura") });
          }
        if(data.type === 'player2-joined'){
         //console.log("INside succesfull player2 - join");
          this.forceUpdate();
          this.props.navigation.navigate('MultiPlayerGame',{socket:this.socket, player: 2, status: 'change', room_number: data.room_number, username: this.props.navigation.getParam("username", "Jura") });
          }
      }
    this.socket.onerror = (e) => console.log(e.message);
    this.socket.onclose = (e) => {
      console.log(e.code, e.reason);
    };

  }


  createRoom(){
    this.play();
    //console.error("sddssfd");
      this.socket.send(JSON.stringify({type: 'create-room', room_number: this.state.rooms.length + 1, username: this.props.navigation.getParam("username", "Jura")}));
      this.setState((previousState) => {
        rooms: previousState.rooms.push({room_number:this.state.rooms.length + 1, player1: this.props.navigation.getParam("username", "Jura"), player2: undefined});
        }
      )
      //console.error("sddssfd");

    };

  joinRoom(room_number){
    this.play();
    //this.socket.send(JSON.stringify({type: 'join-room', room_number: this.state.rooms, username: username, score: 0}));
   //console.log(this.state.rooms[room_number - 1]);
    if(this.state.rooms[room_number - 1].player2 === undefined){
      this.socket.send(JSON.stringify({type: 'join-room', room_number: room_number, username: this.props.navigation.getParam("username", "Jura")}));
      this.setState((previousState) => {
        rooms: previousState.rooms[room_number - 1].player2 = this.props.navigation.getParam("username", "Jura");
        }
      )
    }
    else{
       //console.log('This room is already full :)');
    }
  }

  reloadRooms(){
    this.socket.send(JSON.stringify({type: 'get-rooms-info'}));
  }

  //i am basing the design on 3 columns

  play = () => {
   try {
     SoundPlayer.playSoundFile('button_press', 'wav')
     } catch (e) {
        //console.log(`cannot play the sound file`, e)
     }
   };

  render() {
    let productList = [];
    let counter = 0;
    if(this.state.rooms !== undefined){
      this.state.rooms.forEach((room) => {
              productList.push(
                <TouchableOpacity onPress = {this.joinRoom.bind(this,room.room_number)} style = {(counter % 2 ===0)? styles.room_style1 : styles.room_style2 }  title="A" >
                  <Text style = {(counter % 2 === 0)? styles.text_heading_style1 : styles.text_heading_style2 }>
                    {'Room ' + room.room_number}
                  </Text>
                  <Text style = {(counter % 2 ===0)? styles.text_player_style1 : styles.text_player_style2 }>
                    {((room.player1 === undefined) ? '_ _ _ _' : room.player1) + ' : ' + ((room.player2 === undefined) ? '_ _ _ _' : room.player2)}
                  </Text>
                </TouchableOpacity>
              );
              counter++;
          });
      }

    return (
    <ScrollView onScroll = {this.reloadRooms.bind(this)} contentContainerStyle={styles.contentContainer}>
        {productList}
        <TouchableOpacity onPress = {this.createRoom.bind(this)}  style = {styles.room_style2}  title="A" >
          <Text style = {styles.button_new_room}>
            {'+ Create new room '}
          </Text>

        </TouchableOpacity>
    </ScrollView>
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
  room_style1:{
    position:'relative',
    width: width,
    height:width / 2,
    backgroundColor: '#000',
    fontFamily: 'Reckless',
    color:'black',
    fontSize:30,
    paddingTop:5
  },
  room_style2:{
    position:'relative',
    width: width,
    height:width / 2,
    backgroundColor: '#fff',
    fontFamily: 'Reckless',
    color:'white',
    fontSize:30,
    paddingTop:5,
  },
  text_heading_style1:{
    fontFamily: 'Reckless',
    color:'white',
    fontSize:50,
    paddingTop:50,
    textAlign: 'center',
  },
  text_heading_style2:{
    fontFamily: 'Reckless',
    color:'black',
    fontSize:50,
    paddingTop:50,
    textAlign: 'center',
  },
  text_player_style1:{
    fontFamily: 'Reckless',
    color:'white',
    fontSize:30,
    paddingTop:30,
    textAlign: 'center',
  },
  text_player_style2:{
    fontFamily: 'Reckless',
    color:'black',
    fontSize:30,
    paddingTop:30,
    textAlign: 'center', // <-- the magic
  },
  button_new_room:{
    fontFamily: 'Reckless',
    color:'red',
    fontSize:50,
    paddingTop:50,
    textAlign: 'center',
  },
  contentContainer: {
    marginTop:height/20,
    paddingVertical: 20,

  }
});
