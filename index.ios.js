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


export default class RhymeMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }
  _renderScrollViewContent() {
    const data = Array.from({length: 30});
    return (
      <View style={styles.scrollViewContent}>
        <View style={{height:40,margin:10,marginTop:20}}>
          {this._renderPopularWords()}
        </View>
        
        {data.map((_, i) =>
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        )}
      </View>
    );
  }
  _renderPopularWords() {
    const data = Array.from({length: 10});
    return (
      <ScrollView style={{flex:1,direction:'row'}} horizontal={true}>
        {data.map((_, i) =>
          <TouchableOpacity key={i} style={{backgroundColor:'orange',marginLeft:10,marginRight:5,borderRadius:20,padding:10,paddingLeft:20,paddingRight:20}}>
            <Text style={{fontSize:18,fontFamily:'Champagne & Limousines Bold Italic'}}>Love</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    alert(JSON.stringify(headerHeight));
    return (
      <View style={styles.fill}>

        <ScrollView
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        >
          {this._renderScrollViewContent()}
        </ScrollView>

        <Animated.View style={[styles.header, {height: headerHeight,backgroundColor:'rgba('+JSON.stringify(headerHeight)+',200,200,1)'}]}>
          <View style={{height: 60,width:w,backgroundColor:'rgba(255,255,255,1)'}} elevation={3}>
            <View style={{flex:1,flexDirection:'row'}}>
              <TouchableOpacity style={{height:60,width:30,flex:1,justifyContent:'center'}}>
                <Image source={{uri:'http://downloadicons.net/sites/default/files/wind-icon-62727.png',width:30,height:30}}/>
              </TouchableOpacity>
              <TextInput
                  placeholder={'Word goes here'}
                  style={{height: 65,width:w-70,backgroundColor:'transparent',fontSize:26}}
                  underlineColorAndroid={'transparent'}
                  defaultValue={'Kunal Sachdeva'}
                  placeholderTextColor={'gainsboro'}
                  onFocus ={()=>{}}
                />
              <TouchableOpacity style={{height:60,width:40,flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image source={{uri:'http://www.myiconfinder.com/uploads/iconsets/128-128-5f4dcd85c91ab1d3f90cd736b56bfc9e.png',width:30,height:30}}/>
              </TouchableOpacity>
            </View>
          </View>
          <Image source={{uri:'https://ekostoriesdotcom.files.wordpress.com/2013/12/2013-header-image.png?w=840',width:w,height:300}} style={{resizeMode:'cover',position:'relative',top:-60}}/>
            
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: '#ffa500',
  overflow: 'hidden',
},
title: {
  backgroundColor: 'transparent',
  color: 'white',
  fontSize: 18,
},
scrollViewContent: {
  marginTop: HEADER_MAX_HEIGHT,
},
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('RhymeMaker', () => RhymeMaker);