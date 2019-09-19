import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Login from './pages/Login';
import Aprender from './pages/Aprender';
import Ensinar from './pages/Ensinar';
import React from 'react';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Aula from './pages/Aula';

import  Icon  from 'react-native-vector-icons/FontAwesome5';

const Routes = createBottomTabNavigator({
    Aprender:{
        screen:createStackNavigator({
            Aprender:{
                screen:Aprender,
                navigationOptions:{
                    header:null
                }
            },
            Aula:{
                screen:Aula,
                navigationOptions:{
                    title:'Ver aula',
                    color:'#fff',
                    headerStyle:{
                        backgroundColor:'#7d330f',
                        textColor:'#fff'
                    },
                    headerTintColor:'#ffffff',
                    headerTitleStyle:{
                        fontWeight:'bold',
                        textAlign:'center',
                        flex:1
                    }
                }
            }
    }),navigationOptions:{
        tabBarLabel:'Aprender',
            tabBarIcon:() => (
                <Icon name="slideshare" size={35} color={"#fff"}/>)
    },},
    Ensinar:{
        screen:Ensinar
    },
    Perfil:{
        screen:Perfil,
        navigationOptions:{
            tabBarLabel:'Perfil',
                tabBarIcon:() => (
                    <Icon name="user" size={35} color={"#fff"}/>
                ),
            }
    }    
     },{
         tabBarOptions:{
             showIcon:true,
             style:{
                height:60,
                backgroundColor:'#7d330f',
              },
              activeTintColor:'#fff',
         }
     });

const RootNavigator = createStackNavigator({
    Login:{
        screen:Login,
        navigationOptions:{
            header:null    
        },  
    },
    Cadastro:{
        screen:Cadastro,
        navigationOptions:{
            header:null
        }
    },
    HomePage:{
        screen:Routes,
        navigationOptions:{
            header:null    
        }        
    },
    
},{
    initialRouteName:'Login'
})

export default createAppContainer(RootNavigator);
