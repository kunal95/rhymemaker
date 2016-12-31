import React, {Component} from 'react';
import {
  Animated,AppRegistry,Dimensions,Image,
  ScrollView,TextInput,StyleSheet,
  Text,TouchableOpacity,View,
} from 'react-native';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';
var StatusBarAndroid = require('react-native-android-statusbar');
import SpeechAndroid from 'react-native-android-voice';
//StatusBarAndroid.setARGB(0.5,255,255,255);
const customTextProps = {
  style: {
    fontFamily: 'Champagne & Limousines',color:'white'
  }
};
const customTextPropsInput = {
  style: {
    fontFamily: 'CaviarDreams_Bold'
  }
};

setCustomTextInput(customTextPropsInput);
setCustomText(customTextProps);

const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;

const style={
  header:{
    height:h*0.4,
    width:w
  },
  body:{
    height:h*0.6,
    width:w,
    backgroundColor:'rgb(220,220,220)'
  },
  wordListener:{
    height:h*0.6,
    width:w,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  roundButton:{
    height:(h*0.3),
    width:(h*0.3),
    borderRadius:(h*0.15),
    borderColor:'rgb(100,100,100)',
    borderWidth:3,
    justifyContent:'center',
    alignItems:'center'
  }

}

export default class RhymeMaker extends Component {
  constructor(props) {
    super(props);
  }
  async _buttonClick(){
      try{
          var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.DEFAULT);
          ToastAndroid.show(spokenText , ToastAndroid.LONG);
      }catch(error){
          switch(error){
              case SpeechAndroid.E_VOICE_CANCELLED:
                  ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                  break;
              case SpeechAndroid.E_NO_MATCH:
                  ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                  break;
              case SpeechAndroid.E_SERVER_ERROR:
                  ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                  break;
          }
      }
  }
  _renderPopularWords() {
    const data = Array.from({length: 10});
    return (
      <View style={{height:90}}>
        <View style={{flex:1,flexDirection:'row',marginBottom:10}}>
          <Text style={{color:'rgb(100,100,100)',fontSize:18,margin:10,fontFamily:'Champagne & Limousines Bold'}}>
            Most Popular Words
          </Text>
          <TouchableOpacity style={{backgroundColor:'rgb(255, 106, 0)',height:25,marginTop:8,position:'absolute',right:20}} elevation={4}>
            <Text style={{color:'white',fontSize:12,marginLeft:10,marginRight:10,marginTop:5,fontFamily:'Champagne & Limousines Bold'}}>
              More
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          {data.map((_, i) =>
            <TouchableOpacity key={i} style={{backgroundColor:'orange',marginLeft:10,marginRight:5,borderRadius:20,paddingTop:10,paddingBottom:10}}>
              <Text style={{fontSize:18,fontFamily:'Champagne & Limousines Italic',paddingLeft:20,paddingRight:20}}>Love+{i}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
  wordListenerButton(){
    return(
      <View style={style.wordListener}>
        <TouchableOpacity style={style.roundButton} onPress={()=>_buttonClick()}>
          <Image source={{uri:'http://png.clipart.me/previews/163/iconic-black-abstract-microphone-29087.png',width:w*0.2,height:h*0.2}}/>
        </TouchableOpacity>
    </View>);
  }
  render() {
    return (
      <View>
        <View style={style.header}>
          <Image source={{uri:'https://ekostoriesdotcom.files.wordpress.com/2013/12/2013-header-image.png?w=840',width:style.header.width,height:style.header.height}} style={{resizeMode:'cover'}}/>
          <View style={{backgroundColor:'white',height:h*0.08,width:w-20,margin:10,borderRadius:2,position:'absolute',top:10}} elevation={4}>
             <View style={{flex:1,flexDirection:'row'}} elevation={10}>
              <TouchableOpacity style={{height:h*0.08,width:31,flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image source={{uri:'http://downloadicons.net/sites/default/files/wind-icon-62727.png',width:25,height:25}}/>
              </TouchableOpacity>
              <TextInput
                  placeholder={'Word goes here'}
                  style={{height: h*0.09,width:w-90,backgroundColor:'transparent',fontSize:22}}
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor={'gainsboro'}
                />
              <TouchableOpacity style={{height:h*0.08,width:40,flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image source={{uri:'http://www.myiconfinder.com/uploads/iconsets/128-128-5f4dcd85c91ab1d3f90cd736b56bfc9e.png',width:25,height:25}}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={style.body} elevation={5}>
          {this._renderPopularWords()}
          {this.wordListenerButton()}
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('RhymeMaker', () => RhymeMaker);