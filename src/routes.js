import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Login from './pages/Login';
import Aprender from './pages/Aprender';
import Ensinar from './pages/Ensinar';
import React from 'react';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Aula from './pages/Aula';

import  Icon  from 'react-native-vector-icons/FontAwesome5';
import EuProfessor from './pages/EuProfessor';
import EuAluno from './pages/EuAluno';

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
        screen:Ensinar,
        navigationOptions:{
            tabBarLabel:'Ensinar',
            tabBarIcon:() => (
                <Icon name="handshake" size={35} color={"#fff"}/>
            ),
        }
    },
    Perfil:{
        screen:createStackNavigator({
            Perfil:{
            screen:Perfil,
            navigationOptions:{
                header:null
            }},
            EuProfessor:{
                screen:EuProfessor,
                navigationOptions:{
                    title:'Minhas Turmas - Instrutor',
                    color:'#fff',
                    headerStyle:{
                        backgroundColor:'#7d330f',
                        textColor:'#fff'
                    },
                    headerTintColor:'#ffffff',
                    headerTitleStyle:{
                        textAlign:'center',     
                    }
                }
            },
            EuAluno:{
                screen:EuAluno,
                navigationOptions:{
                    title:'Minhas Turmas - Aluno',
                    color:'#fff',
                    headerStyle:{
                        backgroundColor:'#7d330f',
                        textColor:'#fff'
                    },
                    headerTintColor:'#ffffff',
                    headerTitleStyle:{
                        textAlign:'center',
                    }
                }
           }


    }),navigationOptions:{
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
