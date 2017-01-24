import React, {Component} from 'react';
import {
  Animated,AppRegistry,Dimensions,Image,ToastAndroid,Clipboard,
  ScrollView,TextInput,StyleSheet,DeviceEventEmitter,BackAndroid,
  Text,TouchableOpacity,View,DrawerLayoutAndroid,Linking
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
import LinearGradient from 'react-native-linear-gradient';
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';

StatusBarAndroid.setRGB(255, 148, 0);

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

const h =Dimensions.get('window').height;
const w =Dimensions.get('window').width;
var noOfSearches=0;
const drawerWidth=300;
const style={
  header:{
    width:w
  },
  body:{
    width:w
  },
  icon:{
    height:30,
    width:30
  },
  mic:{
    big:
    {
      wordListener:{
        height:h*0.6-170,
        width:w,
        justifyContent:'center',
        alignItems:'center'
      },
      roundButton:{
        height:(h*0.2),
        width:(h*0.2),
        borderRadius:(h*0.1),
        borderColor:'rgb(255, 150, 0)',
        backgroundColor:'rgb(255, 150, 0)',
        borderWidth:3,
        justifyContent:'center',
        alignItems:'center',
        elevation:5
      },
      micImg:{
        height:h*0.15,
        width:h*0.15
      }
    },
    small:
    {
      wordListener:{
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:20,
        right:20
      },
      roundButton:{
        height:50,
        width:50,
        borderRadius:25,
        borderColor:'rgb(255, 106, 0)',
        backgroundColor:'rgb(255, 106, 0)',
        borderWidth:3,
        justifyContent:'center',
        alignItems:'center',
        elevation:3
      },
      micImg:{
        height:60,
        width:60,
        position:'relative',
        top:10
      }
    }
  }

}

export default class RhymeMaker extends Component {
  constructor(props) {
    super(props);
    this.result=[];
    this.page=1;
    this.drawer=null;
    this.state={
      view:1,
      word:"",
      bodyHeight:h*0.6-75,
      loaderWidth: new Animated.Value(0),
      headerHeight: new Animated.Value(h*0.4),
      searchBar_width:new Animated.Value(w-20),
      searchBar_margin:new Animated.Value(10),
      words:[]
    };
  }
  async startVoiceInput(){
      try{
          SpeechAndroid.startSpeech("Spit it!", SpeechAndroid.DEFAULT)
          .then(text => { })
        .catch(error => { });
      }catch(error){
          switch(error){
              case SpeechAndroid.E_VOICE_CANCELLED:
                  break;
              case SpeechAndroid.E_NO_MATCH:
                  break;
              case SpeechAndroid.E_SERVER_ERROR:
                  break;
          }
      }
  }
  _renderPopularWords() {
    const words = ["love","light","night","water","white","heart","god","world","long"];
    return (
      <View style={{height:90}}>
        <View style={{flex:1,flexDirection:'row',marginBottom:10}}>
          <Text style={{color:'rgb(100,100,100)',fontSize:18,margin:10,fontFamily:'Champagne & Limousines Bold'}}>
            Most Popular Words
          </Text>
        </View>
        <ScrollView horizontal={true}>
          {words.map((word) =>
            <TouchableOpacity key={word} onPress={()=>this.performSearch(word)} style={{backgroundColor:'orange',marginLeft:10,marginRight:5,borderRadius:20,paddingTop:10,paddingBottom:10}}>
              <Text style={{fontSize:18,fontFamily:'Champagne & Limousines Italic',paddingLeft:20,paddingRight:20}}>{word[0].toUpperCase()+word.slice(1)+" "}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
  wordListenerButton(size){
    return(
      <View style={style.mic[size].wordListener}>
        <TouchableOpacity style={style.mic[size].roundButton} onPress={this.startVoiceInput.bind(this)}>
          <Image source={require('./img/mic.png')} style={style.mic[size].micImg} tintColor={'white'}/>
        </TouchableOpacity>
        <Text style={{color:'grey',fontFamily:'Champagne & Limousines Italic',fontSize:14,textAlign:'center',marginTop:10,height:(size=='small')?0:null}}>
          {'Press the mic icon and speak your word\n Works like magic!'}
        </Text>
    </View>);
  }
  performSearch(word){
    if(word!=null){this.state.word=word;this.setState(this.state);}
    if(this.state.word.length>0){
      var word=this.state.word;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            Animated.timing(this.state.loaderWidth,{duration:100,toValue: w*3}).
              start(e=>{
                if(e.finished){
                  noOfSearches++;
                  if(noOfSearches%10==0){
                    AdMobInterstitial.setAdUnitID('ca-app-pub-6552490392723191/6476267467');
                    AdMobInterstitial.requestAd(AdMobInterstitial.showAd(function (e){}));
                  }
                  Animated.timing(this.state.loaderWidth,{duration:300,toValue: 0}).start();
                  var result = JSON.parse(xhttp.responseText);
                  this.result=result;
                  //cleaning
                  this.result=this.result.filter(function(word){return word.word.length>1})
                  this.state.words=this.result.slice(0,100);
                  this.setState(this.state);
                }
              
            });
          }
      }.bind(this);
      xhttp.open("GET", "http://rhymebrain.com/talk?function=getRhymes&word="+word, true);
      xhttp.send();
      Animated.timing(this.state.loaderWidth,{duration:1000,toValue: w/1.5}).start();
      if(this.state.view==1){
        Animated.timing(this.state.headerHeight,{duration:1000,toValue: h*0.08,}).start();
        Animated.timing(this.state.searchBar_width,{duration:1000,toValue: w}).start();
        Animated.timing(this.state.searchBar_margin,{duration:1000,toValue: 0}).start();
        this.state.view=0;
        this.state.bodyHeight=h*0.92-75;
        this.setState(this.state);
      }
    }
  }

  addWords(){
    this.page++;
    this.state.words=this.result.slice(0,this.page*100);
    this.setState(this.state);
  }

  copyToClipboard(word){
    Clipboard.setString(word);
    ToastAndroid.show('"'+word+'" copied to clipboard',ToastAndroid.SHORT);
  }

  renderNavigationView(){
    return (
      <View>
        <View style={{height:200,width:drawerWidth,justifyContent:'center',alignItems:'center'}}>
          <View style={{height:100,width:drawerWidth,position:'absolute',top:0}}>
            <LinearGradient
              colors={['rgb(255, 146, 0)','rgb(255, 156, 0)','rgb(255, 166, 0)','rgb(255, 206, 0)']}
              style={{flex:1}}>
            </LinearGradient>
          </View>
          <TouchableOpacity onPress={()=>Linking.openURL("market://details?id=com.kunal.rhymemaker")}>
            <Image source={require('./img/logo.png')} style={{height:150,width:drawerWidth/2,resizeMode:'contain'}}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{height:60,width:drawerWidth}} onPress={()=>Linking.openURL("market://details?id=com.kunal.rhymemaker")}>
          <Text style={{fontFamily:'CaviarDreams',fontSize:20,marginLeft:35,marginRight:100,color:'rgb(50,50,50)',borderBottomColor:'rgb(240,240,240)',borderBottomWidth:1,height:45}}>Rate App</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height:60,width:drawerWidth}} onPress={()=>Linking.openURL("market://details?id=com.kunal.rhymemaker")}>
          <Text style={{fontFamily:'CaviarDreams',fontSize:20,marginLeft:35,marginRight:100,color:'rgb(50,50,50)',borderBottomColor:'rgb(240,240,240)',borderBottomWidth:1,height:45}}>Feedback</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
  <DrawerLayoutAndroid
    ref="drawerLayoutAndroid"
    drawerWidth={drawerWidth}
    drawerPosition={DrawerLayoutAndroid.positions.Left}
    drawerBackgroundColor={'white'}
    renderNavigationView={() => this.renderNavigationView()}>
      <View style={{backgroundColor:'rgb(220,220,220)'}}>
        <Animated.View style={[style.header,{height: this.state.headerHeight}]}>
          <Animated.Image source={require('./img/2013-header-image.png')} style={{height:this.state.headerHeight,width:w}}></Animated.Image>
          <Animated.View style={{backgroundColor:'white',height:h*0.08,width:this.state.searchBar_width,borderRadius:2,position:'absolute',top:this.state.searchBar_margin,margin:this.state.searchBar_margin}}>
             <View style={{flex:1,flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>this.drawer.openDrawer()} style={{height:h*0.08,width:31,flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('./img/wind-icon-62727.png')} style={style.icon}/>
              </TouchableOpacity>
              <TextInput
                  placeholder={'Word goes here'}
                  style={{height: h*0.09,width:w-90,backgroundColor:'transparent',fontSize:22}}
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor={'gainsboro'}
                  clearButtonMode={'while-editing'}
                  returnKeyType={'search'}
                  selectTextOnFocus={true}
                  selectionColor={'#ffa53f'}
                  value={this.state.word}
                  onChangeText={(t)=>{this.state.word=t;this.setState(this.state);}}
                  onSubmitEditing={(e)=>this.performSearch(e.nativeEvent.text)}
                />
              <TouchableOpacity style={{height:h*0.08,width:40,flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>{(this.state.word.length>0)?this.performSearch():this.startVoiceInput()}}>
                <Image style={style.icon} source={(this.state.word.length>0)?require('./img/right-arrow_318-123022.jpg'):require('./img/128-128-5f4dcd85c91ab1d3f90cd736b56bfc9e.png')}/>
              </TouchableOpacity>
            </View>
            <Animated.View style={{height:3,width:this.state.loaderWidth,elevation:5}}>
              <LinearGradient
                start={{x: 0.0, y: 0.4}} end={{x: 0.8, y: 1.0}}
                locations={[0,0.8]}
                colors={['white', 'orange']}
                style={{flex:1}}>
              </LinearGradient>
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <View style={[style.body,{height:this.state.bodyHeight}]}>
          {(this.state.view===1)?this._renderPopularWords():null}
          {(this.state.view===0)?
            (
                <ScrollView>
                  <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
                    {
                      this.state.words.map((word,i)=>
                        (<TouchableOpacity key={word.word} onPress={()=>this.copyToClipboard(word.word)} style={{padding:10,margin:10,backgroundColor:'rgba(255, 153, 0,'+word.score/300+')',height:30,borderRadius:15,elevation:Math.floor(word.score/100)}}>
                            <Text style={{fontSize:16,fontFamily:'VanillaExtractRegular',position:'relative',bottom:8}}>{word.word}</Text>
                        </TouchableOpacity>
                        )
                      )
                    }
                  </View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:50,marginTop:30,height:40}}>
                    {(this.state.words.length!=this.result.length)?
                      (<TouchableOpacity style={{backgroundColor:'rgb(255, 106, 0)',height:32,elevation:3}} onPress={this.addWords.bind(this)}>
                          <Text style={{color:'white',textAlign:'center',fontSize:18,marginLeft:10,marginRight:10,marginTop:5,fontFamily:'Champagne & Limousines'}}>
                            Give me some more...
                          </Text>
                        </TouchableOpacity>
                    ):null}
                  </View>
              </ScrollView>
          ):null}
          {(this.state.view===1)?this.wordListenerButton("big"):this.wordListenerButton("small")}
        </View>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          testDeviceID="EMULATOR"
          adUnitID="ca-app-pub-6552490392723191/3522801064"
        />
      </View>
    </DrawerLayoutAndroid>
    );
  }
  voiceInputRecieved(e){
    this.performSearch(e.word);
  }

  componentWillMount(){
    DeviceEventEmitter.addListener('voiceInputRecieved', this.voiceInputRecieved.bind(this));
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if(this.state.view!=1){
        Animated.timing(this.state.headerHeight,{duration:1000,toValue: h*0.4}).start();
        Animated.timing(this.state.searchBar_width,{duration:1000,toValue: w-20}).start();
        Animated.timing(this.state.searchBar_margin,{duration:1000,toValue: 10}).start();
        this.state.view=1;
        this.setState(this.state);
        return true;
      }
      else return false;
    }.bind(this));
    AdMobInterstitial.removeAllListeners();
  }
  componentDidMount(){
    this.drawer=this.refs.drawerLayoutAndroid;
  }
}

AppRegistry.registerComponent('RhymeMaker', () => RhymeMaker);