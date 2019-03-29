import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';

export default class HangmanInput extends React.Component {
  render() {

    return (
    <View style = {styles.container}>
      <View style={styles.row}>

          <TouchableOpacity  style = {styles.button}  title="A" onPress = {() => this.props.tellLetter("A")}>
            <Text style = {styles.text_style}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = {styles.button} title="B" onPress = {() => this.props.tellLetter("B")}>
            <Text style = {styles.text_style}>B</Text>
          </TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="C" onPress = {() => this.props.tellLetter("C")}><Text style = {styles.text_style}>C</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="Č" onPress = {() => this.props.tellLetter("Č")}><Text style = {styles.text_style}>Č</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="Ć" onPress = {() => this.props.tellLetter("Ć")}><Text style = {styles.text_style}>Ć</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="D" onPress = {() => this.props.tellLetter("D")}><Text style = {styles.text_style}>D</Text></TouchableOpacity>

      </View>
      <View style={styles.row}>

        <TouchableOpacity style = {styles.button} title="Đ" onPress = {() => this.props.tellLetter("Đ")}><Text style = {styles.text_style}>Đ</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="E" onPress = {() => this.props.tellLetter("E")}><Text style = {styles.text_style}>E</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="F" onPress = {() => this.props.tellLetter("F")}><Text style = {styles.text_style}>F</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="G" onPress = {() => this.props.tellLetter("G")}><Text style = {styles.text_style}>G</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="H" onPress = {() => this.props.tellLetter("H")}><Text style = {styles.text_style}>H</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="I" onPress = {() => this.props.tellLetter("I")}><Text style = {styles.text_style}>I</Text></TouchableOpacity>

      </View>
      <View style={styles.row}>

          <TouchableOpacity style = {styles.button} title="J" onPress = {() => this.props.tellLetter("J")}><Text style = {styles.text_style}>J</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="K" onPress = {() => this.props.tellLetter("K")}><Text style = {styles.text_style}>K</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="L" onPress = {() => this.props.tellLetter("L")}><Text style = {styles.text_style}>L</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="M" onPress = {() => this.props.tellLetter("M")}><Text style = {styles.text_style}>M</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="N" onPress = {() => this.props.tellLetter("N")}><Text style = {styles.text_style}>N</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="O" onPress = {() => this.props.tellLetter("O")}><Text style = {styles.text_style}>O</Text></TouchableOpacity>

      </View>
      <View style={styles.row}>

          <TouchableOpacity style = {styles.button} title="P" onPress = {() => this.props.tellLetter("P")}><Text style = {styles.text_style}>P</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="R" onPress = {() => this.props.tellLetter("R")}><Text style = {styles.text_style}>R</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="Q" onPress = {() => this.props.tellLetter("Q")}><Text style = {styles.text_style}>Q</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="S" onPress = {() => this.props.tellLetter("S")}><Text style = {styles.text_style}>S</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="Š" onPress = {() => this.props.tellLetter("Š")}><Text style = {styles.text_style}>Š</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button} title="T" onPress = {() => this.props.tellLetter("T")}><Text style = {styles.text_style}>T</Text></TouchableOpacity>

      </View>
      <View style={styles.row}>

          <TouchableOpacity style = {styles.button} title="U" onPress = {() => this.props.tellLetter("U")}><Text style = {styles.text_style}>U</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button_last} title="V" onPress = {() => this.props.tellLetter("V")}><Text style = {styles.text_style}>V</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button_last} title="W" onPress = {() => this.props.tellLetter("W")}><Text style = {styles.text_style}>W</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button_last} title="X" onPress = {() => this.props.tellLetter("X")}><Text style = {styles.text_style}>X</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button_last} title="Y" onPress = {() => this.props.tellLetter("Y")}><Text style = {styles.text_style}>Y</Text></TouchableOpacity>


          <TouchableOpacity style = {styles.button_last} title="Z" onPress = {() => this.props.tellLetter("Z")}><Text style = {styles.text_style}>Z</Text></TouchableOpacity>

          <TouchableOpacity style = {styles.button_last} title="Ž" onPress = {() => this.props.tellLetter("Ž")}><Text style = {styles.text_style}>Ž</Text></TouchableOpacity>

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
    top: height * 3 / 5,
    left:0,
    width: width ,
    height: height * 2 / 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin:4
  },
  button:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    width: width / 10,
    height:width / 10,
    backgroundColor:'#000',
    margin: 4
  },
  button_last:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    width: width / 10,
    height:width / 10,
    backgroundColor:'#000',
    margin: 4
  },
  text_style:{
  fontFamily: 'Reckless',
  color:'white',
  fontSize:30,
  paddingTop:5

  }

});
