import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 0,
    },
    title: {
      color: '#f78232',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subTitle:{
      color: '#f78232',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    sugestao: {
      color:'#7d330f',
      fontSize: 18,
      marginTop: 20,
      textAlign: 'center',
    },
    listHorozintal:{
      flex:1,
      alignItems:'center',
      justifyContent:'space-between',
      marginHorizontal:10,
      backgroundColor:'#fffffa',
      borderWidth:0.5,
      borderRadius:10,
      borderColor:'#ccc',
      width:160,
      height:180,
      
    },
    tituloHorizontal:{
      color:'#f78232',
      fontSize:20,
      fontWeight:'bold',
      paddingTop:5,
      paddingHorizontal:5,
      borderBottomWidth:0.5,
      borderBottomColor:'#f78232'
    },
    imageHorizontal:{
      resizeMode:'cover',
      width:'95%',
      height:130,
      borderRadius:10,
      marginVertical:5,
      borderWidth:0.2,
      borderColor:'#ccc'
    },
    containerListVert:{
      flex:1,
      flexDirection:'column',
      justifyContent:'space-between',
      borderWidth:0.5,
      borderRadius:10,
      borderColor:'#ccc',
      marginVertical:5,
      marginHorizontal:10,
      paddingHorizontal:5,
      backgroundColor:'#fffffa',
      paddingBottom:5
    },
    cardVerti:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor: 'transparent',
    },
    imageVertical:{
      resizeMode:'cover',
      marginVertical:10,
      marginHorizontal:5,
      width:160,
      height:120,
      borderRadius:10,
      borderColor:'#7d330f',
      borderWidth:0.2
    },
    listDescricao:{
      flex:1,
      paddingHorizontal:5,
      marginHorizontal:5,
    },
    txtDescricao:{
      color:'#7d330f',
      fontSize:14,
    },
    titleDescricao:{
      color:'#7d330f',
      fontSize:16,
      fontWeight:'bold',
      marginHorizontal:10,
      textAlign:'left',
      borderBottomWidth:0.3,
      borderBottomColor:'#f78232'
    },
    lineTitle:{
      flexDirection:'row',
      borderBottomWidth:0.3,
      borderBottomColor:'#f78232'
    },
    tituloVertical:{
      color:'#f78232',
      fontSize:20,
      fontWeight:'bold',
      paddingTop:5,
      paddingHorizontal:5,
    }
  });

