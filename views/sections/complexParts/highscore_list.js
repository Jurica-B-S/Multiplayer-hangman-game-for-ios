import React from 'react';
import {StyleSheet, Text, View, Button, Dimensions, ImageBackground} from 'react-native';
const uuidv4 = require('uuid/v4');

export default class HighscoreList extends React.Component {
  render() {
    let width = this.props.width;
    let height = this.props.height;
    let scaleFactor = this.props.scaleFactor;
    let leftPad = width;
    const styles = StyleSheet.create({
      highscore_list:{
        position:'absolute',
        top:height/4,
        width: 200,
        height: 200,
        opacity:this.props.opacity,
        zIndex:3
      },
      highscore_list_item_heading:{
        padding:5,
        color:'red',
        fontSize:12,

      },
      highscore_list_item:{
        padding:5,
      },
      infoText:{
        fontFamily:'Reckless',
        fontSize:20,
        textAlign:'center',
      },
      infoTextHeading:{
        fontFamily:'Reckless',
        fontSize:40,
        textAlign:'center',
      }
    });
    let renderArray=[];
    //console.log(this.props.list);
    if(this.props.list !=="Not loaded"){
        let i=1;
        renderArray = this.props.list.map((x) => { return <View key = {uuidv4()} style = {styles.highscore_list_item_heading}><Text style = {styles.infoText} key = {uuidv4()} >{i++}.  {x.name}       {x.value}</Text></View>});
        //console.log(renderArray);
      }



    return (
      <View style = {styles.highscore_list}>
        <View style = {styles.highscore_list_item_heading} ><Text style = {styles.infoTextHeading}>Highscore: </Text></View>
        {renderArray}
      </View>
    );

  }

}
