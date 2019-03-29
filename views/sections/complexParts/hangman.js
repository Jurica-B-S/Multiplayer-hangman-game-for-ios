import React from 'react';
import {StyleSheet, Text, View, Button, Dimensions, ImageBackground} from 'react-native';

export default class Hangman extends React.Component {
  render() {
    let width = this.props.width;
    let height = this.props.height;
    let scaleFactor = this.props.scaleFactor;
    let leftPad = width / 8;
    const styles = StyleSheet.create({
      canvas_hangman:{
        position:'absolute',
        top:0,
        left:0,
        width: width,
        height: height,
        backgroundColor:'#FFF',
        opacity: this.props.opacity
      },
      canvas_hangman1:{
        position:'absolute',
        top:height - height / 200 * scaleFactor,
        width:width / 4 * scaleFactor,
        height:height / 200 * scaleFactor,
        backgroundColor:"#000",
      },
      canvas_hangman2:{
        position:'absolute',
        top: height - height / 200 * scaleFactor - height / 3 * scaleFactor,
        left: leftPad * scaleFactor ,
        width: height / 200 * scaleFactor,
        height:height / 3 * scaleFactor,
        backgroundColor:"#000",
      },
      canvas_hangman3:{
        position:'absolute',
        top: height - height / 200 * scaleFactor - height / 3 * scaleFactor ,
        left: + leftPad * scaleFactor ,
        width: leftPad * 2 * scaleFactor ,
        height:height / 200 * scaleFactor ,
        backgroundColor:"#000",
      },
      canvas_hangman4:{
        position:'absolute',
        top: height - height / 200 * scaleFactor  - height / 3 * scaleFactor ,
        left: + leftPad * 3 * scaleFactor ,
        width: height / 200 * scaleFactor ,
        height:height / 20 * scaleFactor ,
        backgroundColor:"#000",
      },
      canvas_hangman5:{
        position:'absolute',
        top: height - height / 200 * scaleFactor  - height / 3 * scaleFactor  + height / 20 * scaleFactor ,
        left: + leftPad * 3 * scaleFactor  - height / 40 * scaleFactor ,
        borderRadius: height / 40 * scaleFactor ,
        width: height / 20 * scaleFactor ,
        height:height / 20 * scaleFactor ,
        backgroundColor:"#000",
      },
      canvas_hangman6:{
        position: 'absolute',
        top: height  - height / 200  * scaleFactor - height / 3 * scaleFactor  + height / 20 * 2 * scaleFactor ,
        left:  + leftPad * 3  * scaleFactor ,
        width: height / 200 * scaleFactor ,
        height: height / 10 * scaleFactor ,
        backgroundColor:"#000",
      },
      canvas_hangman7:{
        position: 'absolute',
        top: height  - height / 200 * scaleFactor  - height / 3 * scaleFactor  + height / 20 * 2 * scaleFactor  + height / 10 * scaleFactor  - height / 100  * scaleFactor ,
        left:  + leftPad * 3 * scaleFactor  - height / 60 * scaleFactor ,
        width: height / 200 * scaleFactor ,
        height: height / 20 * scaleFactor ,
        transform:[
          {rotate: '45deg'}
        ],
        backgroundColor:"#000",
      },
      canvas_hangman8:{
        position: 'absolute',
        top: height   - height / 200 * scaleFactor  - height / 3 * scaleFactor  + height / 20 * 2 * scaleFactor  + height / 10 * scaleFactor
         - height / 100 * scaleFactor ,
        left:  + leftPad * 3 * scaleFactor  + height / 60 * scaleFactor ,
        width: height / 200 * scaleFactor ,
        height: height / 20 * scaleFactor ,
        transform:[
          {rotate: '-45deg'}
        ],
        backgroundColor:"#000",
      },
      canvas_hangman9:{
        position: 'absolute',
        top: height  - height / 200 * scaleFactor  - height / 3 * scaleFactor  + height / 20 * 2 * scaleFactor   + height / 200 * scaleFactor  ,
        left:  + leftPad * 3 * scaleFactor  - height / 60 * scaleFactor ,
        width: height / 200 * scaleFactor ,
        height: height / 20 * scaleFactor ,
        transform:[
          {rotate: '45deg'}
        ],
        backgroundColor:"#000",
      },
      canvas_hangman10:{
        position: 'absolute',
        top: height  - height / 200 * scaleFactor  - height / 3 * scaleFactor  + height / 20 * 2 * scaleFactor  + height / 200 * scaleFactor ,
        left:  + leftPad * 3 * scaleFactor  + height / 60 * scaleFactor ,
        width: height / 200 * scaleFactor ,
        height: height / 20 * scaleFactor ,
        transform:[
          {rotate: '-45deg'}
        ],
        backgroundColor:"#000",
      },
      cloudFunnyMesage:{
        position: 'absolute',
        top:-80 * scaleFactor,
        left:20 * scaleFactor,
        zIndex:3,
        width: 150 * scaleFactor,
        height:150 * scaleFactor,

      }
    });



    return (
      <View style = {styles.canvas_hangman} >
        <View style = {[styles.canvas_hangman1, (this.props.counter < 1 ) ? {opacity:0} : {opacity:1}]}></View>
        <View style = {[styles.canvas_hangman2, (this.props.counter < 2 ) ? {opacity:0} : {opacity:1}]}></View>
        <View style = {[styles.canvas_hangman3, (this.props.counter < 3 ) ? {opacity:0} : {opacity:1}]}></View>
        <View style = {[styles.canvas_hangman4, (this.props.counter < 4 ) ? {opacity:0} : {opacity:1}]}></View>
        <View style = {[styles.canvas_hangman5, (this.props.counter < 5 ) ? {opacity:0} : {opacity:1}]}>
          <View style = {styles.cloudFunnyMesage}>
            <ImageBackground source = {require('./img/cloud.png')}  style = {{flex:1, height: 100 * scaleFactor, width: 78 * scaleFactor}} resizeMode = 'contain'>
              <Text style = {{paddingTop: 34 * scaleFactor, paddingLeft: 16 * scaleFactor, paddingRight: 15 * scaleFactor,
                fontSize: 6 * scaleFactor}}>{this.props.message}</Text>
            </ImageBackground>
          </View>
        </View>
        <View style = {[styles.canvas_hangman6, (this.props.counter < 6 ) ? {opacity:0} : {opacity:1}]}></View>
        <View style = {[styles.canvas_hangman7, (this.props.counter < 7 ) ? {opacity:0} : {opacity:1}]}></View>
        <View style = {[styles.canvas_hangman8, (this.props.counter < 8 ) ? {opacity:0} : {opacity:1}]}></View>
        <View style = {[styles.canvas_hangman9, (this.props.counter < 9 ) ? {opacity:0} : {opacity:1}]}></View>
        <View style = {[styles.canvas_hangman10, (this.props.counter < 10) ? {opacity:0} : {opacity:1}]}></View>
      </View>
    );

  }

}
