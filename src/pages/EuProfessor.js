import React,{useState,useEffect} from 'react';
import {Text, View, ScrollView,FlatList,Image,StyleSheet,AsyncStorage,Button} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5'

import api from '../services/api';
// Tela responsável por exibir as aulas em que o usuário é o instrutor
export default function EuProfessor({navigation}){

  const [aulas,setAulas] = useState([]);
  const [users,setUsers] = useState([]);

  useEffect(()=> {
    async function loadAulas(){
        const user_id = await AsyncStorage.getItem('user');
        const response = await api.get('./professor',{
            headers:{user_id}
        });

        const {message} = response.data;
        
        if(!message){
            const {aula} = response.data;
            setAulas(aula);
        }else{
            alert(message);
        }
    }
    loadAulas();
  }, []);



        // function listaAlunos(aula_id){
        //     alunos.forEach(async user_id => {
        //         console.log('Array de alunos:',alunos)
        //          const response = await api.get('/lista',{
        //             temp
        //          });
        //           console.log('User:', response.data.user);
        //         //  const {name, celular} = response.data.user[0]
        //          //temp.push(response.data.user[0])
        //          //setUsers(temp)
        //          //setUsers(response.data.user)
        //          //alert(name)
        //          //setUsers(response.data.user[0])
        //          //setNameAluno(...name)
        //     });
        //     console.log('temp:',temp)
        //     setUsers(temp.indexOf(0))
        //     console.log('users:',users)
        //     //setNameAluno(name)
        // };

        async function listaAlunos(aula_id){
            //setArray(alunos)
            const response = await api.get('/lista',{
                headers:{aula_id}
            })
            const {nomes} = response.data
            setUsers(nomes);
        }
    return(
        <ScrollView>
            <Text style={styles.title}>Essas são as suas aulas!</Text>
            <View style={styles.cardContainer}>
            <FlatList 
                data={aulas}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                    <View style={styles.cardContainer}>
                        <Text style={styles.tituloAula}>{item.titulo}  </Text>
                        <View style={styles.imageContainer}>
                            <Text>Número de alunos:{item.alunos.length} </Text>
                            
                            <Image style={styles.image} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+item.aulaImagem}}/>
                        </View>
                        <Button color={'#f78232'} title={'Visualizar alunos'} onPress={() => listaAlunos(item._id)}/>
                        
                    </View>   
                )}
            /> 
                <Text>Pessoas que gostaram da sua instrução:  
                    <Text> {users.length} </Text>
                </Text>
                <FlatList
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                    <View style={styles.listaAlunos}>
                        <View style={styles.listaCard}>
                            <Icon name="user" color={"#f78232"} size={22} />
                            <Text style={styles.tituloAula}> {item.nome} </Text>
                        </View>
                        <View style={styles.listaCard}>
                            <Icon name='whatsapp' color={'#f78232'} size={22}/>
                            <Text> {item.celular} </Text>
                        </View>
                    </View>
                    )}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        color:'#f78232'
    },
    cardContainer:{
        borderWidth:1,
        borderColor:'#f78232',
        paddingHorizontal:10,
        paddingVertical:10,
        marginVertical:5,
        marginHorizontal:3
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
    },  
    listaAlunos:{
        alignItems:'baseline',
        justifyContent:'center',
        borderWidth:0.2,
        borderColor:'#f78232',
        marginVertical:2,
        marginHorizontal:10,
        paddingHorizontal:2,
        paddingVertical:2
    }
})