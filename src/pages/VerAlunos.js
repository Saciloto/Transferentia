import React,{useState,useEffect} from 'react';
import {Text, View, ScrollView,FlatList,StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5'

import api from '../services/api';

// Tela responsável por exibir as aulas em que o usuário é o instrutor
export default function EuProfessor({navigation}){

  const [users,setUsers] = useState([]);

  useEffect(()=> {
    async function loadUsers(){
        const aula_id = navigation.getParam('aula_id')
        const response = await api.get('/lista',{
            headers:{aula_id}
        })

        const {nomes} = response.data
        setUsers(nomes);
    }
    loadUsers();
  }, []);

    return(
        <ScrollView>
                <Text style={styles.title}>Entre em contato com seus possíveis alunos e comece a ensinar!</Text>
                <Text style={styles.textCenter}> Instrução: <Text style={styles.bold}> {navigation.getParam('aula_titulo')} </Text> </Text>
                <Text style={styles.textCenter}> Total de inscrições:  <Text style={styles.bold}> {users.length} </Text> </Text>
                <FlatList
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                    <View style={styles.listaAlunos}>
                        <View style={styles.listaCard}>
                            <Icon name="user" color={"#f78232"} size={22} />
                            <Text style={styles.tituloAula}> - {item.nome} </Text>
                        </View>
                        <View style={styles.listaCard}>
                            <Icon name='envelope' color={'#f78232'} size={22}/>
                            <Text> - email@email.com </Text>
                        </View>
                        <View style={styles.listaCard}>
                            <Icon name='whatsapp' color={'#f78232'} size={22}/>
                            <Text> - {item.celular} </Text>
                        </View>
                    </View>
                    )}
                />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        color:'#7d330f'
    },
    cardsContainer:{
        borderWidth:1,
        borderColor:'#f78232',
        paddingHorizontal:10,
        paddingVertical:10,
        marginVertical:5,
        marginHorizontal:5,
    },
    cardContainer:{
        borderWidth:1,
        borderColor:'#f78232',
        paddingHorizontal:10,
        paddingVertical:10,
        marginVertical:5,
        marginHorizontal:5,
    },
    tituloAula:{
        fontSize:16,
        fontWeight:'bold'
    },
    imageContainer:{
        flexDirection:'row',
    }, 
    image:{
        flex:1,
        marginLeft:10,
        marginVertical:5,
        width:'50%',
        height: 120,
        resizeMode:'cover',
        borderRadius:10
    },
    listaCard:{
        flexDirection:'row',
        backgroundColor:'#fffffa',
        marginVertical:2
    },  
    listaAlunos:{
        alignItems:'baseline',
        justifyContent:'center',
        borderWidth:0.2,
        borderColor:'#f78232',
        marginVertical:2,
        marginHorizontal:10,
        paddingHorizontal:2,
        paddingVertical:2,
    },
    bold:{
        fontWeight:'bold',
        color:'#7d330f'
    },
    textCenter:{
        textAlign:'center',
        fontSize:16
    }
})