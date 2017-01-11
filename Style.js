import React, {Component} from 'react';
import {Dimensions} from 'react-native';

const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;

const style={
  header:{
    width:w
  },
  body:{
    width:w
  },
  mic:{
    big:
    {
      wordListener:{
        height:h*0.6-100,
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
        bottom:50,
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

export default style;