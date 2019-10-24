import React,{useState,useEffect} from 'react';
import {Text, View, ScrollView,FlatList,Image,StyleSheet,AsyncStorage,Button} from 'react-native';

import api from '../services/api';
// Tela responsável por exibir as aulas em que o usuário é o instrutor
export default function EuProfessor({navigation}){

  const [aulas,setAulas] = useState([]);
  const [users,setUsers] = useState([]);
  const [nameAluno,setNameAluno] = useState([])
  const [array,setArray] =useState([])
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



        // function listaAlunos(alunos){
            
        //     // alunos.forEach(async user_id => {
        //     //     //alert(alunos)
        //     //      const response = await api.get('/user',{
        //     //          headers:{user_id:user_id}
        //     //      });
        //     //       console.log('User:', response.data.user);
        //     //     //  const {name, celular} = response.data.user[0]
        //     //      temp.push(response.data.user[0])
        //     //      //setUsers(temp)
        //     //      //setUsers(response.data.user)
        //     //      //alert(name)
        //     //      //setUsers(response.data.user[0])
        //     //      //setNameAluno(...name)
        //     // });
        //     // console.log('temp:',temp)
        //     // setUsers(temp)
        //     // console.log('users:',users)
        //     // //setNameAluno(name)
        // };

        async function listaAlunos(){
            //setArray(alunos)
            //const response = await api.get('/lista')
            alert('Em desemvolvimento')
            //setUsers(response.data)
        }
    return(
        <ScrollView>
            <Text style={styles.title}>Essas são as suas aulas!</Text>
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
                        <Button color={'#f78232'} title={'Visualizar alunos'} onPress={() => listaAlunos()}/>
                    </View>   
                )}
            />                
                {/* <FlatList
                    data={users}
                    keyExtractor={item => {item._id}}
                    renderItem={({item}) => (
                        <View>
                            <Text style={styles.tituloAula}> {item.name} </Text>
                            <Text> {item.celular} </Text>
                        </View>
                    )}
                /> */}
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
    }
})