import React, {Component} from 'react';
import {
  Animated,AppRegistry,Dimensions,Image,ToastAndroid,
  ScrollView,TextInput,StyleSheet,DeviceEventEmitter,BackAndroid,
  Text,TouchableOpacity,View,TouchableHighlight,TouchableNativeFeedback
} from 'react-native';
import SpeechAndroid from 'react-native-android-voice';
import LinearGradient from 'react-native-linear-gradient';
import {CoordinatorLayout, BottomSheetBehavior, FloatingActionButton} from 'react-native-bottom-sheet-behavior';
import style from './../Style.js';

const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;

export default class Results extends Component {
    constructor(props){
        super(props);
        this.props=props;
        this.state={words:this.props.words};
        this.page=1;
    }



  addWords(){
    this.page++;
    this.state.words=this.props.result.slice(0,this.page*100);
    this.setState(this.state);
  }

    render(){
        alert(this.state.words.length);
        return(
      <CoordinatorLayout>
            <View style={{height:h,width:w}}>
                <ScrollView>
                  <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
                    {
                      this.state.words.map((word,i)=>
                        (<TouchableOpacity key={word.word} style={{padding:10,margin:10,backgroundColor:'rgba(255, 153, 0,'+word.score/300+')',height:30,borderRadius:15,elevation:Math.floor(word.score/100)}}>
                            <Text style={{fontSize:16,fontFamily:'VanillaExtractRegular',position:'relative',bottom:8}}>{word.word}</Text>
                        </TouchableOpacity>
                        )
                      )
                    }
                  </View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:50,marginTop:30,height:40}}>
                    {(this.props.words.length!=this.props.result.length)?
                      (<TouchableOpacity style={{backgroundColor:'rgb(255, 106, 0)',height:32,elevation:3}} onPress={this.addWords.bind(this)}>
                          <Text style={{color:'white',textAlign:'center',fontSize:18,marginLeft:10,marginRight:10,marginTop:5,fontFamily:'Champagne & Limousines'}}>
                            Give me some more...
                          </Text>
                        </TouchableOpacity>
                    ):null}
                  </View>
              </ScrollView>
               <BottomSheetBehavior
                  ref="bottomSheet"
                  peekHeight={200}
                  hideable={false}
                  elevation={4}
                  state={BottomSheetBehavior.STATE_COLLAPSED}>
                    <View style={{backgroundColor:'red'}}><Text>lol</Text></View>
              </BottomSheetBehavior>
              <FloatingActionButton ref="fab" style={{elevation:5}}/>
            </View>
        </CoordinatorLayout>);

    }
  componentDidMount() {
    this.refs.fab.setAnchorId(this.refs.bottomSheet)
  }
}