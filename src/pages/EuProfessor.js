import React,{useState,useEffect} from 'react';
import {Text, View, ScrollView,FlatList,Image,AsyncStorage,Button} from 'react-native';
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {styles} from '../pages/estilos/styles'

import api from '../services/api';
// Tela responsável por exibir as aulas em que o usuário é o instrutor
export default function EuProfessor({navigation}){

  const [aulas,setAulas] = useState([]);
  const [aviso,setAviso] = useState(false);
  const [mensagem,setMensagem] = useState('');
  const [question,setQuestion] = useState(false);
  const [selectAula,setSelectAula] = useState(null);

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
            setMensagem('Você não compartilhou nenhuma instrução, comece agora mesmo!!')
            setAviso(true)
        }
    }
    loadAulas();
  }, []);

    async function excluirAula(id_aula){
        setQuestion(false)
        setMensagem('Aula excluída com sucesso!')
        await api.delete('/aula/'+id_aula)
        setAviso(true)
    }

    return(
        <ScrollView>
            <Text style={styles.subTitle}>Essas são as suas aulas!</Text>
            <FlatList style={{paddingTop:10}} data={aulas} keyExtractor={item => item._id}
                        renderItem={({item}) => (
                <View style={styles.containerListVert}>
                <View style={styles.lineTitle}>
                    <Icon name='quote-left' color={'#f78232'} size={22} style={{padding:3}}/>
                    <Text style={styles.tituloVertical}>{item.titulo}</Text>
                </View>
                <View style={styles.cardVerti}>
                    <Image style={styles.imageVertical} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+item.aulaImagem}}/>
                    <View style={styles.listDescricao}>
                        <Text style={styles.titleDescricao}>Descrição:</Text>
                        <Text numberOfLines={6} style={styles.txtDescricao}>- {item.descricao}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <Button color={'#f78232'} title={'Visualizar alunos'} onPress={() => navigation.navigate('VerAlunos',{aula_id:item._id,aula_titulo:item.titulo})}/> 
                    <Button color={'#7165c1'} title={'Excluir aula'} onPress={() => {setSelectAula(item._id),
                        setMensagem('Deseja excluir essa aula?'), setQuestion(true)}} />
                </View>
                </View>
            )}
            />
            <SCLAlert 
                onRequestClose={()=>setAviso(false)}
                theme='info'
                show={aviso}
                title={'Opa!'}
                subtitle={mensagem}>
                <SCLAlertButton theme='info' onPress={()=> setAviso(false)}>OK!</SCLAlertButton>
            </SCLAlert>
            <SCLAlert 
                onRequestClose={()=>setAviso(false)}
                theme='warning'
                show={question}
                title={'Opa!'}
                subtitle={mensagem}>
                <SCLAlertButton theme='info' onPress={()=> setQuestion(false)}>Me enganei</SCLAlertButton>
                <SCLAlertButton theme='danger' onPress={()=> excluirAula(selectAula)}>Excluir</SCLAlertButton>
            </SCLAlert>
        </ScrollView>
    )
}