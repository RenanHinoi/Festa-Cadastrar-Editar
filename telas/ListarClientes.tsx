import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Cliente from '../components/Cliente';

import api from '../components/Api';

import {useNavigation,} from '@react-navigation/native';

export default function ListarClientes() {

    const navigation = useNavigation();
    
    const [dados, setDados] = useState<any[]>([]);

    async function buscaClientes(){
        const resposta = await api.get('clientes');
        setDados(resposta.data);
    }

    useEffect(
        ()=>{
            buscaClientes();
        }
    );
 return (
    <>
        <View style={styles.bloco}>
            <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('TelaCad' as never)}>
                <Text style={styles.txtBtn}>Cadastrar Novo Cliente</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.bloco}>
            <Text style={styles.titulo}> Lista de Clientes </Text>

            <FlatList 
                data={dados}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=><Cliente nome={item.nome} cpf={item.cpf} saldo={item.saldo} id={item.id}/>}
                style={styles.lista}
            />

        </View>       
    </>   
  );
}

const styles = StyleSheet.create({
  titulo:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:20
  },
  btn:{
    backgroundColor:'#669988',
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:20,
    padding:20,
    borderRadius:20
  },
  txtBtn:{
    textAlign:'center',
    fontSize:20
  },
  bloco:{
    width:'100%'
  },
  lista:{
    width:'80%',
    height:'70%'
  }
});